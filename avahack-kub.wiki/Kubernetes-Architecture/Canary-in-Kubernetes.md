The idea is to use a small subset of servers containing a newer version of an application, to do a blind test of the new version amongst a small number of users.

This can be accomplished using Kubernetes to deploy the two releases, along with a Kubernetes load balancer service.

As well as a standard Kubernetes deployment script, like the example below:
```
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
  name: kubeapp-production
spec:
  replicas: 3
  template:
    metadata:
      name: kubeapp
      labels:
        app: kubeapp
        env: production
    spec:
      containers:
      - name: kubeapp
        image: gcr.io/PROJECT_ID/app:1.0
        imagePullPolicy: Always
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
        command: ["/app"]
        ports:
        - name: kubeapp
          containerPort: 8080
```
a secondary deployment script containing the Canary container needs to be defined, similar to the first:
```
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
# Change the label
  name: kubeapp-canary
spec:
# This determines the ratio of canary instances to legacy instances
  replicas: 1
  template:
    metadata:
      name: kubeapp
      labels:
        app: kubeapp
# The app value needs to be the same for Kubernetes to combine them
        env: canary
    spec:
      containers:
      - name: kubeapp
# This is the new application version
        image: gcr.io/PROJECT_ID/app:2.0
        imagePullPolicy: Always
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
        command: ["/app"]
        ports:
        - name: kubeapp
          containerPort: 8080
```
A load balancer needs to be created:
```
kind: Service
apiVersion: v1
metadata:
  name: app-lb
spec:
  type: LoadBalancer
  ports:
  - name: http
    port: 80
    targetPort: 8080
    protocol: TCP
  selector:
# This app value checks for deployment scripts with
# a spec.template.metadata.labels.app value equal
# to the one specified
    app: kubeapp
```
We don’t need to do any changes to the load since it already has a selector applied to the label **app: kubeapp** which spans across both deployments (Stable and Canary). So Pods launched via the Canary Deployment will auto-join the load balancer.