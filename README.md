# Todo App - A todo App develop as Microservices Kubernetes and deployed on AWS using Terraform and Kubeone and apply Continuous Integration Deployment with Travis CI 

## Table of Contents

* [OverView](#OverView)
* [Setting Virtual Linux Environment](#Setting-Virtual-Environment-Linux)
* [Installing Softwares](#Installing-Softwares)
* [Setting Environment Variables Windows](#Setting-Environment-Variables-Windows)
* [Setting Environment Variables Linux](#Setting-Environment-Variables-Linux)
* [Installation Todo App - Docker](#Installation-Todo-Docker)
* [Part 1 - Create AWS Kubernetes Infrastructure](#Installation-Todo-Kubernetes-Infrastructure)
* [Part 2 - Installation Todo Kubernetes To AWS](#Deploy-Todo-Kubernetes)
* [Part 3 - Continuous Integration and Deployment Using Travis CI](#Todo-Travis-CI)
* [Project Reference Sources Or Links](#references)

## OverView

In this project, we will apply the skills we have acquired in this cloud engineering course to design, deploy and operate a AWS Todo application. The App consist of two parts, a backend which is written in Nodejs and enitirely a micro-services architecture. And the other part is the front-end which is written in React TypeScript. The main use of this App is to allow users to login to the system and add a list of Todos Items. User requires to add a description for the Item and also allows users to upload an image base on the created Item. Users can also delete the Item and also marked the item as "DONE" on the checkbox to remind users the Item is completed.

This project reuse our existing "SERVERLESS" application and convert and extend into a microservice architecture. The microservice architecture makes it more easier to scale it to large systems. They are great enablers for continuous integration and delivery too. This includes independent scaling, independent releases and deployments  and independent development so that ACH service has its own codebase. After the application is divided into smaller services, we will containerize it and deploy it to a Kubernetes cluster. This includes deployment pipeline, scalability, observability, Services, Networking and deployment strategies to service the system. 

For this project we will choose linux as development environment. Which is used to create the AWS infrasturture and deploy it to the Cloud. 

For Window you can use Oracle Vitualbox Virtual Machine for simulating the Linux Environment. If you personally has a Linux Environment you can skip to part.

## Setting-Virtual-Environment-Linux

 * VirtaulBox Machine For Download
    * To install please follow the this link: https://www.virtualbox.org/wiki/Downloads. 

 * Ubuntu OS Dowload
    * Download the Ubuntu from the Ubuntu website: https://ubuntu.com/download, we will download the Ubuntu 18.0.4 desktop version.

 * Add Ubuntu OS to the Virtual Machine.
    1. From the VirtualBox click the `New` Button.
    2. For the name type in `todo-app`. For the type field select `Linux` and `Ubuntu 64-bit` for the Version.
    3. Leave Everthing as default. (You can adjust the Storage Space according to your needs).
    4. Then Click the `Setting` Button.
    5. Go to the `Storage` Section => For the `Controller IDE`, Select the Ubuntu OS Image you download.
    6.  Click the `Start` button to begin install the Ubuntu OS. Follow the setup instructions and install.

## Installing-Softwares

 * Install Nodejs. 
      when you sucessfully install Nodejs, `npm (Node Package Manager)` will be installed as well.
      * To install Nodjs, please follow this link: https://nodejs.org/en/download/

 * Install git 
      * sudo apt install git-all

 * Softwares for Kubernetes
    1. Download the Terraform (For generating the AWS infrasturture) link: https://www.terraform.io/downloads.html , please choose Linux and download the version v0.12.13, follow the steps for installation.
    2. Download the KubeOne (a management tool for managing High Availability Cluster) from this Site: https://github.com/kubermatic/kubeone. 
    download the version v0.10.0 
    3. Dowload the Kubectl (for running commands against the Kubernetes Cluster). Follow this link: https://kubernetes.io/docs/tasks/tools/install-kubectl/ the version v1.16.2  


## Setting-Environment-Variables-Windows
    * For Windows, Open the `File Explorer` and right click the `The PC`, Select the properties. From pop-up window choose `Advance System Settings`, then choose `Environment Variables`.

     * Please add the following Environment Variables.
      - USERS_TODO_TABLE ="Users-Todo-dev"
      - USERID_INDEX ="UserIdIndex"
      - TODOS_S3_BUCKET ="kubernetes-andrew-todos-dev"
      - THUMBNAILS_S3_BUCKET ="kubernetes-todos-andrew-thumbnail-dev"
      - SIGNED_URL_EXPIRATION ="300"
      - AWS_REGION ="us-east-2"
      - AWS_PROFILE ="default"
      - TODO_VERSION ="v0"
      - URL ="http://localhost:3000" 

## Setting-Environment-Variables-Linux
    * For Linux:
      * Please type in the following in the Terminal.
         export USERS_TODO_TABLE="Users-Todo-dev"
         export USERID_INDEX="UserIdIndex"
         export TODOS_S3_BUCKET="kubernetes-andrew-todos-dev"
         export THUMBNAILS_S3_BUCKET="kubernetes-todos-andrew-thumbnail-dev"
         export SIGNED_URL_EXPIRATION="300"
         export AWS_REGION="us-east-2"
         export AWS_PROFILE="default"
         export TODO_VERSION="v0"
         export URL="http://localhost:3000"
   
## Installation-Todo-Docker

* The only options to install Todo App is by cloning from the git hub please follow the instructions below .

    1. From the shell Terminal, type in the command:
        * git clone `https://github.com/singlun/todo-capstone.git`. 
    2. After cloning, browse to the `client` folder. From the client folder,  you need to install the packages and dependencies for the frontend. Type in the following command in the client folder.
        * npm install
    3. After cloning, browse to the `k8s-restapi-todo` folder. From the folder,  you need to install the packages and dependencies for the backend. Type in the following command in the folder.
        * npm install        
    4. Build and Create the docker Images.
        * Browser to the folder `todo-deployment/docker`. Type the following command: 
        `docker-compose -f docker-compose-build.yaml build --parallel`. This will build all the images for the Todo Project.
    5. Push all the images to the Docker Hub Repository. You need to have a Docker Hub account.
        * From the Shell Terminal. Type in `docker login` (`you need to have a dockerhub account`), you will be prompt in the username and password.
        * To push all the images to Docker Hub , type in `docker-compose -f docker-compose-build.yaml push`.
    6. Run the project.
        * To run the Todo App. Type in `docker-compose up`.

## Installation-Todo-Kubernetes-Infrastructure 

   * From the Linux Machine :

        1. Export both your AWS_ACCESS_KEY_ID and export AWS_SECRET_ACCESS_KEY in your terminal. If you quit your bash session you’ll have to do this again. Execute echo $AWS_ACCESS_KEY_ID to make sure you’ve done this correctly.

        2. Download Terraform and kubeone describe above.

        3. After download Kubeone. Unzip it.

        4. Browse to the folder `/examples/terraform/aws`.

        5. Copy the whole `aws` folder to the root directory.        

        6. Inside the `aws` folder, modify the variables.tf file. To make it simple, the only thing you need to modify is the `aws_region`. Please fill in the region of your AWS account.

        7. Then inside the `aws` folder. Type in the command `terraform init`.

        8. Then type in the command `terraform apply`. This will create the AWS infrasturctue according to the requirements that specify in the `variables.rf` file. This process will takes around 5 to 10 minutes.

        9. Then now comes to Deploy your K8s high up in the clouds. But before you need to do some preparation.

            * Please follow this link `https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent` to generate the public and private `ssh-key` and add it to the `ssh-agent`.

        10. Again inside the `aws` folder type in the command `kubeone config print > config.yaml`. This will generate a config file that will be used to deploy the k8s to the aws cloud. Open the file and modify the name to `todo-app-cluster`.

        11. Type in the command `kubeone install config.yaml -t .` to deploy the k8s to the AWS.

        12. After the install, there will be a `todo-app-kubeconfig` file generated.

        13. Backup the `todo-app-kubeconfig` file, and rename it to `config` and copy it to `$HOME/.kube`.


## Deploy-Todo-Kubernetes

   * From the Linux Machine :

        1. From the shell Terminal, type in the command:
            * git clone `https://github.com/singlun/todo-capstone.git`.   

        2. Browse to the folder `todo-deployment/k8s`. 

        3. Deploying Everything: 

            * By typing in the command `kubectl -f file-name apply`, `file-name` are the files in the k8s folder. 
                For instance : `kubectl -f frontend-deployment.yaml apply`.

    * Things need to remind `thanks to Dan B.`. 

        * Base64 credentials:

            - aws-secret.yaml
                * Find your credentials in ~/.aws/credentials.
                You need to save your key in base64 —> type in 'base64 credentials'  —> this output is what you save under “credentials” in your aws-secret.yaml file.
            - env-configmap.yaml
                * Make sure all these variables are correct. This is pretty self explanatory. You should know where to get these values if the are not   already saved in your bash profile.

        * CONSISTENCY IS KEY!!!

            If your reserve proxy is not running: Execute: kubectl logs ${your pod name here}

            To find your node value execute kubectl get nodes -o wide. Copy the NAME for all nodes that are MASTERS into the bash command above. This should fix your problem.

            If you have any “CrashLoopBackOff” Errors then you have a variable issue. Make sure your env-configmap.yaml has the proper values. If need be: Kubectl delete secret env-config update your env-configmap.yaml Kubectl apply -f env-configmap.yaml

        * Helpful commands:

            Kubectl describe pod/svc/rs/deployment ${name of pod/service/replicaset/deployment} Kubectl log ${name of pod/service/replicatset/deployemnt}

            Its helpful to look at the logs if something is wrong. It’ll show you the code output in your containers should you need to debug.

## Todo-Travis-CI
    
   * In order to perform CI/CD with Travis CI. you first need to create an account. Go to the link `https://travis-ci.com/` and create one.             
   * After the Travis account is created. You also need to have a git account. Go to the link `https://github.com/` and create one.
   * Settings for the Travis CI:
    * The only setting for the Travis CI is the kubeconfig Evironment Variable, please follow the steps below:
        * Inorder for the Travis to access your cluster, the easiest way is to base64 encode your kubeconfig file and adding it as an environment variables under the settings for your repository             
            * To base64 encode your kubeconfig file you can use the following cmd:
               `cat ${HOME}/.kube/config | base64`
            * Then in the Travis Web page create a Environment Variable name `KUBE_CONFIG` and the paste the base64 code as the value.


## References

* Code References
    * [Kubeone](https://github.com/kubermatic/kubeone)
    * [Udacity](https://www.udacity.com/)
    * [GitHub](https://github.com/)
    * [Generating ssh key and add it to the agent](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
    * [Linux Too Many Open Files Solution](https://blog.csdn.net/fdipzone/article/details/34588803)
    * [kubectl (exec error: unable to upgrade connection: Forbidden ) Solution](https://github.com/opsnull/follow-me-install-kubernetes-cluster/issues/255)
    * [Kubernetes Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
    * [Installing Kubeadmin , Kubelet and Kubectl](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
    * [Running HA Kubernetes Cluster Using Kubeone in AWS](https://medium.com/@alexander_15213/running-ha-kubernetes-clusters-on-aws-using-kubeone-535b93af57ab)
    * [How to install Kubernetes on AWS Cluster using Kubeone](https://github.com/kubermatic/kubeone/blob/master/docs/quickstart-aws.md)
    * [Learn Kubernetes Basic](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
    * [Install and setup Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
    * [Get a Shell to a Running Container](https://kubernetes.io/docs/tasks/debug-application-cluster/get-shell-running-container/)      
    * [Continuous delivery to Kubernetes with Travis CI](https://www.caveofcode.com/continuous-delivery-to-kubernetes-with-travis-ci/)   
