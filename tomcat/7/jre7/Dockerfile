FROM tomcat:7

MAINTAINER Xi Liu <swordmouse@163.com>

ENV CATALINA_OPTS -XX:MaxPermSize=256m -Xms1024m -Xmx2048m -Dfile.encoding=UTF8

# change timezone
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
	echo $TZ > /etc/timezone

# Ensure UTF-8 locale
ENV LANG zh_CN.UTF-8