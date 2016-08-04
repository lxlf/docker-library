FROM alpine:latest

MAINTAINER Xi Liu <swordmouse@163.com>

RUN apk add --no-cache tftp-hpa \
	&& apk add --no-cache sysklogd \
	&& apk add --no-cache bash   \
    && mkdir -p /data/tftproot/  \
    && mkdir -p /data/tftplog/   \
    && chmod 777 /data/tftproot/ \
    && chmod 777 /data/tftplog/  \
    && ln -s /var/log/syslog /data/tftplog/tftplog
    
VOLUME ["/data/tftproot/"]

VOLUME ["/data/tftplog/"]

EXPOSE 69/udp

ADD run.sh /run.sh

RUN chmod +x /*.sh

CMD ["/run.sh"]