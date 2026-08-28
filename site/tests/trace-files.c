#define _GNU_SOURCE
#include <dlfcn.h>
#include <fcntl.h>
#include <stdarg.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

static void trace_path(const char *path) {
  const char *trace = getenv("MFA_FILE_TRACE");
  if (!trace || !path) return;
  FILE *file = fopen(trace, "a");
  if (file) { fprintf(file, "%s\n", path); fclose(file); }
}

int open(const char *path, int flags, ...) {
  static int (*real_open)(const char *, int, ...) = NULL;
  if (!real_open) real_open = dlsym(RTLD_NEXT, "open");
  trace_path(path); va_list args; va_start(args, flags); mode_t mode = va_arg(args, mode_t); va_end(args);
  return (flags & O_CREAT) ? real_open(path, flags, mode) : real_open(path, flags);
}

int open64(const char *path, int flags, ...) {
  static int (*real_open64)(const char *, int, ...) = NULL;
  if (!real_open64) real_open64 = dlsym(RTLD_NEXT, "open64");
  trace_path(path); va_list args; va_start(args, flags); mode_t mode = va_arg(args, mode_t); va_end(args);
  return (flags & O_CREAT) ? real_open64(path, flags, mode) : real_open64(path, flags);
}

int openat(int dirfd, const char *path, int flags, ...) {
  static int (*real_openat)(int, const char *, int, ...) = NULL;
  if (!real_openat) real_openat = dlsym(RTLD_NEXT, "openat");
  trace_path(path); va_list args; va_start(args, flags); mode_t mode = va_arg(args, mode_t); va_end(args);
  return (flags & O_CREAT) ? real_openat(dirfd, path, flags, mode) : real_openat(dirfd, path, flags);
}
