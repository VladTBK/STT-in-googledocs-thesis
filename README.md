# All thesis ideas including personal notes, problems from the first version, problems that appeared along the way are found in Notes&Code.md

## Here is how you install the extension

-   Go to any Chromium browser (for now Google Chrome is the safest)
-   Search chrome://extensions/
-   Open Developer mode and click Load unpacked
-   Search for project folder and load the _dist_ repo.

## Here are leasted updates and changes of the version after 24.03.2023

-   Made the microphone object movable but still testing for possible bugs. _(25.03.2023 19:53)_
-   The microphone object is smoothly movable inside the main document. _(25.03.2023 20:50)_
-   Added a tooltip when hovering over the button because the data tool was ugly. _(25.03.2023 21:13)_
-   Made the microphone object movable everywhere on the document. The main reason was because of a bug with the container it was previously on. _(25.03.2023 22:57)_
-   Made the first version of transcribing text to Google Documents with partial text. This is way faster, but still has some random bugs, like not writing text in order. However, it is still pretty decent. _(26.03.2023 13:34)_
-   Managed to replace old text with incoming new one, but only in final version. Need to combine partial with final. _(27.03.2023 15:07)_
-   Made the version of transcribing text to GD with partial better. In the first version there was a problem with text ordering. For example if not a word but more were received, let's say "Hi mom I am foo" they were transcribed from last to first so "foo am I mom Hi". Sometimes even if the word was to long it got delayed even more. This was due fetch being async yet was called sync. Also sending chunks of words not one by one helped. _(27.03.2023 19:48)_
-   Managed to replace old text (that being partial) with incoming new one (that being full). System is not perfect because is pretty simple: I save all partial in a buffer => I get the final **better** version => I replace all that was in buffer with the final.
    There are still problems: Docs might not store all values or store random values: For example if buffer is: "Hi mom I am Foo", but
    somehow a similiar text like "Hi mom I am bar Foo" was received by docs, bar is junk => text won't be updated _(27.03.2023 21:32)_
-   Fixed a bug with button not being responsive to resolution and zoom scaleing. Problem now is not really smooth on the oX axys _(27.03.2023 22:40)_
-   Decided to use the Google Api Script for most of the formating. For now all I have impleneted in it is the rewriting old data ( it will be send between ``) with the new data using the function batchUpdating. The partial transmision was not affected, also made some changes with funciton declaration of **UpdateDoc** in service-worker _(01.04.2023 17:00)_
-   Finished the formating function: **newParagraph** in Google Api Script, for now works just fine. Found a bug with the replacing where it sometimes prints the content of the docs twice (maybe the substring needs to be changed) _(01.04.2023 17:50)_
-   Fixed the bug with double texting, it was from how I was writing the new text in the Document
-   Found a bug where if you say a punctation in a text, and say again that punction, it doubles. For example: " I said punct" it writes " I said." .If "punct" is the next word it will write " I said ..."_(01.04.2023 18:25)_
-   Finished the formating function to replace _punctuation marks_
-   Finished the formating function: **newBulletList** in Google Api Script. It is a little diffrent then the one used before, because now in GAS there are only a limited number of posibile bullet list type. You can make your own, but tbh is useless work just to have an arrow bullet list. Also fixed a bug where if you added a new paragraph / new bullet list, text would not update _(02.04.2023 19:23)_
-   Made so the text is writen where the cursor is placed in docs _(09.04.2023 16:00)_
-   Fixed a bug where text wouldn't not update if there were reaming _"`"_ on previous paragraphs _(09.04.2023 16:16)_
-   Made so you can select a phrase from Google Documents. After this I need to make it so user can add a text style to it. Also fixed some bugs with formatings _(15.04.2023 23:16)_
-   Made so you can style any phrase form the last paragraph in a Google Documents. Also fixed mor bugges _(16.04.2023 15:10)_
-   Updated verion above so it dosen't require global index _(16.04.2023 17:52)_
-   Used Levenshtein distance to get the closest element in an array. This way is more safe to get the actualy word for the speed to be mostly the same _(21.04.2023 16:50)_
-   Usded Levenshtien distance for both text styleing and phrase seraching in Docs. Also solve some bugs _(23.04.2023 12:20)_
-   Discoverd why there was a huge latancy (about 5 seconds) between sending commands. Chaing from final to partial reduce it by 5x but reduces performances and causes issues with writing. Sticking with final _(23.04.2023 15:53)_
-   Made a GUI for user to know the current status and some other features of the program _(24.04.2023 22:22)_
-   Made so the following letters after !, ? or . to be uppercase _(03.05.2023 20:28)_
