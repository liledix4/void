# 🌀 Void

**Void** is a file organizer. Primarily for Windows, however it can be adapted to support Linux.

In the future, Void is planned to be expanded to the self-hosted file tracker that parses file lists from repositories and provides sources to download specific files from various sources.

## Features

### Void (main script)

- [x] Drag and drop files and folders onto batch script for processing.
  - [ ] For Linux.
- [x] Checkout local files in case if they're already uploaded online.
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

### Void4Telegram

- [x] Connect to your Telegram account.
- [x] Upload files to Telegram chat.
- [x] Download files from Telegram chat.

### Void Utilities

- [x] Fix hashes.
- [x] Find missing hashes.

### MultiHasher4Void

- [x] Pass files and directories to MultiHasher.
- [x] Using MHX files (MultiHasher XML), organize files in Void fashion.
