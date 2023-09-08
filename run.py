from collections import Counter

__PHRASE_TERMINATIONS = (".", "?", "!")
__ADDITIONAL_WORD_SPLITTERS = ("'", "-")

if __name__ == "__main__":
    paragraph = "Bonjour, bonjour, tout le monde... ! C'est une belle journée ! ! ! Comment allez-vous ?! Moi ça va SUPER !! J'aime TROP TROP TROP programmer, je trouve ça SUPER rigolo"
    sanitized_phrase = ""
    phrases_count = 0
    waiting_for_a_new_chunk = False

    for c in paragraph:
        if c.isspace() or c in __ADDITIONAL_WORD_SPLITTERS:
            sanitized_phrase += ' '
        elif c.isalpha():
            sanitized_phrase += c.lower()
            waiting_for_a_new_chunk = False
        elif not waiting_for_a_new_chunk and c in __PHRASE_TERMINATIONS:
            phrases_count += 1
            waiting_for_a_new_chunk = True

    if not waiting_for_a_new_chunk:
        phrases_count += 1

    words = sanitized_phrase.split()
    words_count = Counter(words)

    for word, occurrences in words_count.items():
        print(f"{word.capitalize()}: {occurrences}")
    print(f"Nombre de phrases : {phrases_count}")
