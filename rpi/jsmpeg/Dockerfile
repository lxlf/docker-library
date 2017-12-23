# Pull base image
FROM hypriot/rpi-node:8.1.3-onbuild

MAINTAINER Xi Liu <swordmouse@163.com>

# change timezone
RUN ln -snf /usr/share/zoneinfo/PRC /etc/localtime && echo "Asia/Shanghai" > /etc/timezone

# Ensure UTF-8 locale
ENV LANG zh_CN.UTF-8