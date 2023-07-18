#include <time.h>
#include <stdio.h>
#include <stddef.h>
#include <stdbool.h>
#include <stdlib.h>

#include "./modules/config.h"

void initialize_random_seed(void)
{
  srand(time(NULL));
}

int get_random_number(const int MIN, const int MAX)
{
  return (rand() % (MAX - MIN + 1)) + MIN;
}

void instructions_msg(const int MIN, const int MAX)
{
  printf("Devinez quel est le nombre mystère. C'est un nombre entre %d et %d.\n", MIN, MAX);
}

bool incorrect_user_input(const int USER_INPUT, const int MIN, const int MAX)
{
  return USER_INPUT < MIN || USER_INPUT > MAX;
}

void flush_input_data(void)
{
  int c;
  while ((c = getchar()) != '\n' && c != EOF && c != '\0')
    ;
}

int secured_digit_prompt(const char *PROMPT, const char *ERROR_MSG)
{
  int scanf_res = -1;
  int user_input = 0;

  while (true)
  {
    printf("%s", PROMPT);
    scanf_res = scanf("%d", &user_input);
    if (scanf_res == EOF)
    {
      exit(0);
    }
    if (scanf_res == 1)
    {
      break;
    }
    else
    {
      flush_input_data();
    }
    if (ERROR_MSG == NULL)
    {
      printf("%s", CONFIG.DEFAULT_INVALID_USER_INPUT_ERROR_MSG);
    }
    else
    {
      printf("%s", ERROR_MSG);
    }
  }
  return user_input;
}

int get_user_tried_number(const int CURRENT_ATTEMPTS_COUNT, const int MAX_ATTEMPTS, const int MIN, const int MAX)
{
  int user_input = MIN - 1;
  bool incorrect_input = true;
  char prompt[128];
  char error_msg[128];

  sprintf(prompt, "Tentative %d/%d > ", CURRENT_ATTEMPTS_COUNT, MAX_ATTEMPTS);
  sprintf(error_msg, "Veuillez entrer un nombre valide entre %d et %d.\n", MIN, MAX);

  while (incorrect_input)
  {
    user_input = secured_digit_prompt(prompt, NULL);
    incorrect_input = incorrect_user_input(user_input, MIN, MAX);
    if (incorrect_input)
    {
      printf("%s", error_msg);
    }
  }
  return user_input;
}

bool guess_loop(const int MAX_ATTEMPTS, const int NUMBER_TO_GUESS, const int MIN, const int MAX)
{
  int user_input = 0;
  bool incorrect_input = false;

  for (int current_attempts_amount = 1; current_attempts_amount <= MAX_ATTEMPTS; current_attempts_amount++)
  {
    user_input = get_user_tried_number(current_attempts_amount, MAX_ATTEMPTS, MIN, MAX);

    if (user_input < NUMBER_TO_GUESS)
    {
      printf("C'est plus...\n");
    }
    else if (user_input > NUMBER_TO_GUESS)
    {
      printf("c'est moins...\n");
    }
    else
    {
      printf("Nombre correct !\n");
      return true;
    }
  }
  printf("Perdu !\n");
  return false;
}

bool play_again_choice(void)
{
  int user_input = 0;

  while (true)
  {
    user_input = secured_digit_prompt("\nRejouer ? [0/1] > ", NULL);
    if (user_input == 0)
    {
      return false;
    }
    else if (user_input == 1)
    {
      return true;
    }
  }
}

void scene_title(void)
{
  const char *BORDER = "----------------";

  printf("%s\nDevine le nombre\n%s\n\n", BORDER, BORDER);
}

bool scene_game(void)
{
  const int MIN_VALUE = CONFIG.GUESS_LIMIT_MIN;
  const int MAX_VALUE = CONFIG.GUESS_LIMIT_MAX;
  const int MAX_ATTEMPTS = CONFIG.GUESS_LIMIT_MAX_ATTEMPTS;
  const int RANDOM_NUMBER = get_random_number(MIN_VALUE, MAX_VALUE);
  bool has_won = false;

  instructions_msg(MIN_VALUE, MAX_VALUE);
  has_won = guess_loop(MAX_ATTEMPTS, RANDOM_NUMBER, MIN_VALUE, MAX_VALUE);
  return has_won;
}

bool play_again_prompt(const bool WINNING_CTX)
{
  bool play_again = true;
  bool has_won = WINNING_CTX;

  while (play_again)
  {
    play_again = play_again_choice();
    if (play_again)
    {
      printf("\n");
      has_won = scene_game();
    }
  }
  return has_won;
}

bool scene_gameover(void)
{
  return play_again_prompt(false);
}

bool scene_replay(void)
{
  return play_again_prompt(true);
}

bool game_loop(void)
{
  bool has_won = false;

  scene_title();
  has_won = scene_game();
  if (!has_won)
  {
    has_won = scene_gameover();
  }
  else
  {
    has_won = scene_replay();
  }
  return has_won;
}

void close_game(const bool HAS_WON)
{
  if (HAS_WON)
  {
    printf("Vous avez fini sur une victoire. Bravo !\n");
  }
  else
  {
    printf("Vous avez fini sur une défaite... NUL, NUL, NUL !\n");
  }
}

int main(void)
{
  bool has_won = false;
  initialize_random_seed();
  has_won = game_loop();
  close_game(has_won);

  return 0;
}
