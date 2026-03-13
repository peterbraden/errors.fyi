# Error Codes

I want to make a website that is a directory of error codes encountered when
running any software. We can seed it for development with the HTTP error codes,
but the idea is that it can expand and include many other errors, such as POSIX
codes, et al.

The idea is that the website is statically generated from a github repository,
so that anyone can make pull requests to add new codes. CI should automatically
rebuild the site when the pull request is merged.

## Tasks
- Find a good name by querying available (cheap) domain names. Confirm with me!
- Create a basic repo structure and seed with HTTP error codes.
- Ensure that the website is building automatically.
