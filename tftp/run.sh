#!/bin/bash

/usr/sbin/syslogd

ln -s /var/log/syslog /data/tftplog/tftplog

exec /usr/sbin/in.tftpd -L -c -s /data/tftproot -u root -v