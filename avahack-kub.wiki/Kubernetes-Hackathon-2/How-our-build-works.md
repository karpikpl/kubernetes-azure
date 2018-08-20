# What
The repository is a simple (almost dependency less) node.js app - it runs on node:8

# Build process
![Screen Shot 2018-08-17 at 1.55.51 PM.png](../.attachments/Screen%20Shot%202018-08-17%20at%201.55.51%20PM-aaddbf97-631a-44cf-b6b0-539ee2aa7373.png)

First docker image is built using `docker build . -t avahack.azurecr.io/avahackkub:<version>` where
* avahack.azurecr.io is the name of our container registry
* **avahackkub** is the name of the image
* **<version>** is set by the build, e.g. 2

After the image is built, it's pushed to container registry (avahack.azurecr.io)

# Helm
Helm (https://helm.sh/) is the package manager for Kubernetes.

Helm uses a packaging format called charts. (https://github.com/helm/helm/blob/master/docs/charts.md)

Charts are .yaml files that describe how the application is going to run in Kubernetees.

# About TIller
Tiller is the service that actually communicates with the Kubernetes API to manage our Helm packages.

# Helm-init
During the build, we set up the local environment for helm.
_To set up just a local environment, use '--client-only'. That will configure $HELM_HOME, but not attempt to connect to a Kubernetes cluster and install the Tiller deployment._ (https://github.com/helm/helm/blob/master/docs/helm/helm_init.md)

# Helm package
Packages a chart into a versioned chart archive file
```bash
helm package --destination /opt/vsts/work/1/a /opt/vsts/work/1/s/charts/sampleapp
```

# Artifact
Packaged and versioned chart becomes the build artifact and can be used for deployments.
