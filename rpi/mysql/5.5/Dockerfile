FROM hypriot/rpi-mysql:5.5

MAINTAINER Xi Liu <swordmouse@163.com>

# change timezone
RUN ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone

# Ensure UTF-8 locale
ENV LANG zh_CN.UTF-8