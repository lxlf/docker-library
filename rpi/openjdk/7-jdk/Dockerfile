# Pull base image
FROM resin/rpi-raspbian:jessie

MAINTAINER Xi Liu <swordmouse@163.com>

# Install dependencies
RUN apt-get update && apt-get install -y \
    openjdk-7-jdk \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Default to UTF-8 file.encoding
ENV LANG C.UTF-8

# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-armhf

# Define default command
CMD ["bash"]