# Pull base image
FROM hypriot/rpi-node:8

MAINTAINER Xi Liu <swordmouse@163.com>

# change timezone
RUN ln -snf /usr/share/zoneinfo/PRC /etc/localtime && echo "Asia/Shanghai" > /etc/timezone

# Ensure UTF-8 locale
ENV LANG zh_CN.UTF-8

# Setup useful environment variables
ENV CONF_INSTALL  /opt/jsmpeg

# Install Atlassian Confluence
RUN mkdir -p                   "${CONF_INSTALL}" \
    && chmod -R 700            "${CONF_INSTALL}"

# Config files
COPY config/ "${CONF_INSTALL}"

WORKDIR "${CONF_INSTALL}"

RUN chmod +x *.sh

# Define default command
CMD ["/bin/sh /opt/jsmpeg/catalina.sh"]