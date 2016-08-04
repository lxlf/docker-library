FROM alpine:latest

MAINTAINER Xi Liu <swordmouse@163.com>

RUN apk add --no-cache tftp-hpa \
	&& apk add --no-cache sysklogd \
    && mkdir -p /data/tftproot/ \
    && chmod 777 /data/tftproot/
    
VOLUME ["/data/tftproot/"]

EXPOSE 69/udp

CMD ["/usr/sbin/in.tftpd", "-L", "-c", "-s", "/data/tftproot", "-u", "root"]