#!/bin/bash

/usr/sbin/syslogd

exec /usr/sbin/in.tftpd -L -c -s /data/tftproot -u root -v