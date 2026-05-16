# 🌀 Void

**Void** is a file organizer. It's hash-based, it heavily relies on the calculation of hash sums: hierarchy is relatively flat, with files being renamed to their hashes, however the original file names are being stored in special ``.void`` text files.

Void is being developed primarily for Windows, however it can be adapted to support Linux.

In the future, Void is planned to be expanded to the self-hosted file tracker that parses file lists from repositories and provides sources to download specific files from various sources.

Void is created and maintained by **liledix⁴**.

## Features

### Void (main script)

- [x] Calculate hash sum for a file, rename file to its hash, then create a directory named after file extension and put a file in there.
- [x] If directory is being a target, recursively process each file in it.
- [x] Drag and drop files and folders onto batch script for processing.
  - [ ] For Linux.
- [x] Checkout local files in case if they're already uploaded online.
  - For now, it reads ``result.json`` of exported Telegram chat and compares it to local files.
- [ ] Add certain file extensions to ZIP archives that Telegram never or improperly treat as documents, particularly GIF and WebP.
- [ ] Clear empty directories.
- [ ] ``[TEMP]`` Merge Void Utilities and MultiHasher4Void into it.
  - [ ] If file exceeds the 2 GiB limit for hash calculation, add its path to the temporary array until the operation ends, then pass the collected array to MultiHasher.
- [ ] Return file metadata when hash is requested. If file is absent, but record of it exists in ``.void`` files, return the record itself.
- [ ] Copy file from Void to a specific directory under the name for that file known from ``.void`` records.
- [ ] Rebuild a certain file structure using ``.fromvoid`` file.
  - [ ] Make it syncable. Meaning: if ``.fromvoid`` file constantly gets an updated structure, then rebuild the structure and make it up to date.
- [ ] Instead of straight-up copying, make it able to rely on symbolic links.
  - [ ] Various types may be supported: classic symbolic links, junction points, and hard links.
- [ ] Smarter ``.void`` lists. Make it possible to set the dynamic rules. Depending on the available metadata, you may specify, create regular expression, or set the range for such file attributes as: file name, file size, date modified, date created, intended directory, hash pattern, track name (for music), and so on.
- [ ] Split Void to minimal version (everything necessary in just one script file without third-party packages) and full version (a proper swiss-army knife).
- [ ] Make it possible to pack full version of Void into a single executable or Linux package. It also may have some GUI, at least CLI-based.
- [ ] ``.env`` support for additional configurations.

### Void4Telegram

- [x] Connect to your Telegram account.
- [x] Upload files to Telegram chat.
- [x] Download files from Telegram chat.
- [x] Get a full Telegram chat history (no files downloaded).
- [x] Check if a certain file name exists in Telegram chat.

### Void Utilities

- [x] Fix hashes.
- [x] Find missing hashes.

### MultiHasher4Void

[See more here.](./multihasher4void/README.md)

- [x] Pass files and directories to MultiHasher.
- [x] Using MHX files (MultiHasher XML), organize files in Void fashion.

## Known limitations and issues

- Due to Node.js restrictions, Void can't calculate hash for the files bigger than 2 GiB. Therefore, Void relies on MultiHasher for that specific task.
- Void can't work with files being located in a drive different from a drive where the script is running.
- If you rely on drag-and-dropping into Windows batch scripts, certain complex names of files and directories can be read incorrectly. That's an issue of how Windows batch script treats the input file paths. If you do it with files separately, better put them into a directory and drag-and-drop directory instead, Void script itself will read the files correctly.
