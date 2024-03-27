FROM ubuntu:18.04
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN apt upgrade -y
RUN apt-get update -y
RUN apt-get install node -y
RUN echo "daemon off;" >> /etc/node/node.conf

CMD ["node"]