## Deploy it on Google Cloud Run
[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run?git_repo=https://github.com/juntakuo/proxy-server.git&revision=tsuhao_test)
## Updated front-end code:

## To Build a dockerimage:

*Prerequisites:*

* Install Docker (if you don't already have it)
* Install [pack](https://github.com/buildpacks/pack/releases)
```
brew install buildpacks/tap/pack
```

### Creating the Image

We utilize Google's Cloud Function Builder [buildpack](https://github.com/GoogleCloudPlatform/buildpacks) to ensure consistency with what will be generated on Google Cloud Functions

```
pack build snap-pixel-gateway -B gcr.io/buildpacks/builder:v1
```

After running that command you should have a docker image named `snap-pixel-gateway`

This image can then be pushed to a repository with `docker push` or exported as a `.tar.gz` with `docker export`

### Running the container 

To run the built contianer, you may simply:

```
docker run --rm -p 8080:8080 snap-pixel-gateway
```

And the server should be up and running on port `8080`

While this is suitable for very testing and development, in production you should use something like `docker compose` or `kubernetes` or utilize your hosting architecture's container orchestration such as Amazon ECS to automatically scale up and down and ensure health of containers.
