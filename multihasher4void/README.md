# MultiHasher4Void

MultiHasher, a file hash calculator, can be downloaded for free from the [official website](https://www.abelhadigital.com/multihasher) or [Softpedia](https://www.softpedia.com/get/System/File-Management/MultiHasher.shtml). MultiHasher helps avoiding one problem Void currently has (as of May 2026): file size for hash calculation is limited to 2 GiBs.

## How to use?

In order to apply Void way of file organizing using MultiHasher, you have to use two separate batch script files: ``gethashsumfile.bat`` and ``runfromhashsum.bat``.

### Get Hash Sum File

First, you need to get a list of hash sums of all files you need to organize. For that, you need to have these environment variables filled out in ``.env`` file:

- ``MULTIHASHER_EXECUTABLE_PATH``—full path to ``MultiHasher.exe`` executable file.
- ``HASH_ALGORITHM``—type of hash algorithm to work with. As of MultiHasher 2.8.2, the following values are supported: ``crc32``, ``md5``, ``ripemd160``, ``sha1``, ``sha224``, ``sha256``, ``sha384``, ``sha512``, ``sha512-224``, ``sha512-256``.

> [!NOTE]
> Unfortunately, MultiHasher doesn't provide command-line arguments for saving hash sums to a file. So you have to do it manually.
>
> Once the hash calculation is complete, select ``File → Save list...``. Save as MultiHasher XML (``.mhx``). After that, you move on to the next batch script.

### Run from Hash Sum File

Once you have a hash sum file (XML-formatted ``.mhx``), you use this batch script to finally rename and move files in the Void fashion. This script doesn't do additional calculations since it's assumed that MultiHasher already did heavy lifting.

If you don't use ``VOID_OUTPUT_PATH`` environment variable, script puts all files (collected into directories named after file extensions) next to the place you run the script from.
