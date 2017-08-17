FROM swordmouse/rpi-java:1.8.0

MAINTAINER Xi Liu <swordmouse@163.com>

RUN apt-get update && apt-get install -y libc6 librxtx-java --no-install-recommends && rm -rf /var/lib/apt/lists/* && cp /usr/lib/jni/librxtxSerial.so /usr/lib &&  cp /usr/lib/jni/librxtxParallel.so  /usr/lib

