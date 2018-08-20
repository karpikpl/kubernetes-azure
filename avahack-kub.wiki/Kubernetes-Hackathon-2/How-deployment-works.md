# Deployment job
![Screen Shot 2018-08-17 at 2.24.11 PM.png](../.attachments/Screen%20Shot%202018-08-17%20at%202.24.11%20PM-65c36e07-f615-441b-aa77-216a99c89f51.png)

## Install
Makes sure Helm is installed on the build machine

## Helm init
This will install Tiller to your running Kubernetes cluster. It will also set up any necessary local configuration.

## Helm upgrade
https://github.com/helm/helm/blob/master/docs/helm/helm_upgrade.md
This takes the chart created in the build step and upgrades it to a new version.
Parameters provided in the command are:
* image.repository=avahack.azurecr.io/avahackkub - name of the image from azure container registry
* image.tag=$(Build.BuildId) - version of the image
* applicationInsights.InstrumentationKey=<KEY> - sets instrumentation key for Azure Insights (logging/monitoring)
* ingress.enabled=true 
* ingress.hostname=dev-sampleapp.ecf09b3edb444f8480b4.eastus.aksapp.io

Properties map directly to *Chart* - in _charts/sampleapp/values.yaml_:
```yaml
# Default values for sampleapp.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
fullnameOverride: sampleapp
replicaCount: 2
image:
  repository: VALUE_TO_BE_OVERRIDDEN
  tag: latest

imagePullSecrets: []
service:
  port: 8080

ingress:
  enabled: false
  annotations:
    kubernetes.io/ingress.class: addon-http-application-routing
  path: /
  hostname: VALUE_TO_BE_OVERRIDDEN

secrets: {}
resources: {}
nodeSelector: {}

tolerations: []

affinity: {}

applicationInsights:
  InstrumentationKey: VALUE_TO_BE_OVERRIDDEN
```

# Other
## About Helm
Helm has two parts: a client ( helm ) and a server ( tiller ).

**Tiller** runs inside of your Kubernetes cluster, and manages releases (installations) of your charts.
**Helm** runs on your laptop, CI/CD, or wherever you want it to run.

## About Ingress
An API object that manages external access to the services in a cluster, typically HTTP.
Ingress can provide load balancing, SSL termination and name-based virtual hosting.
