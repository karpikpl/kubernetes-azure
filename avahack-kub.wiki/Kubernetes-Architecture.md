Kubernetes makes it easy to deploy, manage, and scale containerized applications. It does this by organizing containers into pods and providing mechanisms to add and remove nodes to a cluster that each run a pod replica set.

<IMG src="http://callistaenterprise.se/assets/blogg/docker/kubernetes-on-docker-in-docker/kubernetes.jpg" alt="Image result for kubernetes"/>

### Container

Docker is the most popular container used with Kubernetes. A container is like a lightweight VM that sits on top of the OS. It is portable and more lightweight than a VM.

### Pods

Pods represent a single instance of an application running on a server. They can be a single container or a group of containers that can easily communicate and share resources. The containers within a pod can have shared storage via volumes.

For example, one container run an Ubuntu image with Node.js that houses the web application. Another could run an Ubuntu image with MongoDB that handles all database requests from the other container by saving to a volume.

### Nodes

Nodes are physical or virtual machines that run pods. There can be multiple nodes in a cluster that each run multiple pods. Each node has a **kube-proxy** service that manages port mappings to pods as well as a **kubelet** service that manages pods including the starting and stopping them.

### Scaling

Multiple pods can be run on the same node. This increases concurrency on a single machine. Also since each pod is independent if one fails another can be used without any down time. Additional nodes can also be added to have, for example, a backup running in case one machine goes down. 

### Load Balancing

Kubernetes automatically distributes load between all pods on a node. There can also be a load balancer for all nodes in a cluster. Load balancing can be as simple as round robin. It can also allow for rolling updates where traffic is sent only to available pods as pods are updated one at a time to newer versions, allowing for app updates with no down time.

### Afinity
 
Node affinity allows users to specify what pods can be deployed on which nodes. This allows specifying, for example, that certain pods that have containers with specific hardware requirements are run on nodes that meet those requirements.



