#ifndef CONFIG_CONSTANTS_H
#define CONFIG_CONSTANTS_H
static const struct
{
  int GUESS_LIMIT_MIN;
  int GUESS_LIMIT_MAX;
  int GUESS_LIMIT_MAX_ATTEMPTS;
  char *DEFAULT_INVALID_USER_INPUT_ERROR_MSG;
} CONFIG = {
    1,
    100,
    10,
    "Saisie invalide !\n"};
#endif
