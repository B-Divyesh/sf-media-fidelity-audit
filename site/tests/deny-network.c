#define _GNU_SOURCE
#include <errno.h>
#include <stdio.h>
#include <sys/socket.h>

int socket(int domain, int type, int protocol) {
  FILE *log = fopen("/tmp/mfa-network-attempted", "a");
  if (log) { fputs("socket\n", log); fclose(log); }
  errno = EPERM;
  return -1;
}

int connect(int fd, const struct sockaddr *address, socklen_t length) {
  (void)fd; (void)address; (void)length;
  FILE *log = fopen("/tmp/mfa-network-attempted", "a");
  if (log) { fputs("connect\n", log); fclose(log); }
  errno = EPERM;
  return -1;
}
