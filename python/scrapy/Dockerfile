FROM python:3.7.1-stretch

MAINTAINER Xi Liu <swordmouse@163.com>

RUN mkdir -p /data        \
  && pip3 install pymysql \
  && pip3 install scrapy

VOLUME /data

WORKDIR /data

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["scrapy"]
