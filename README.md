
# Mail Online technical test

I used http-server to test my code, but opening index.html works fine also. I chose not to use any frameworks, so there isn't anything else to install. 

## Testing
I don't have much experience with automated testing. Instead I have done some manual tests to make sure that the main code functions as expected.

### List repositories from the 'nodejs' organisation by name

The nodejs organisation on Github has 151 repositories.

Expected:
```
length: 151
```

Actual:
```
length: 30 
```
This may be due to pagination, and the search only returns the first 30 repositories it finds. I'm unclear on how to check this, as the repositories are listed in order of most recently updated, and while the most recent repository in the list was updated within the past half hour, another hadn't been updated since Jan 2015. However, I have checked and all 30 repositories can be found by name.

### When clicking on a repository, expand and make a request to get the open issues from that repository

To test this I will manually check open issues for some of the repositories against what is returned.

#### http-parser

Expected:
```
Is there any parser for mysql like http-parser?
The http request can't be totally parsed
oss-fuzz integration
Consolidate duplicate content-length response headers semver-major
add BINDIR in Makefile
How do you install this package in Ubuntu
[Idea] Rewriting in LLVM DSL
Supporting mildly-broken clients and/or ICE/1.0
Conan package for http-parser
Test "CONNECT_WITH_BODY_REQUEST" maybe worng
Need to consider the noBody situation for HEAD method
Group related tests into files
Convert test suite to TAP output
HTTP/0.9 does not have header fields
Makefile is broken for OS X
http-parser fails to detect chunked encoding at the end of a list
http-parser impossible condition check
http-parser invalid octets allowed in reason-phrase
http-parser allows extra spaces before the status code?
uri-parser allows extra characters after asterisk?
uri-parser incorrect escape of pct-encoded? 
Custom methods should be supported
Making it easier to build it for OpenIndiana
Is this valid according to rfc2616?
Support for digits, -, +, and . in uri scheme
ProTip! Add no:assignee to see everything that’s not assigned.
CMake support
HEAD, 1xx, 204, 304 have content-length but do not have body
http_parser should invoke the begin message callback on first byte, regardless of whether or not its valid
Forcing a pause at the end of HTTP headers


```
Actual:
```
Is there any parser for mysql like http-parser?
The http request can't be totally parsed
Ensure host offset & length are initialized - fuzzer found possible leaks
MSVC Error C2220: p hides prev. local declaration
test: various small fixes
oss-fuzz integration
Consolidate duplicate content-length response headers
Support ICE/1.x for SOURCE requests.
Chunk extensions callbacks
Assign LIBDIR if not already defined
use BINDIR in Makefile
add BINDIR in Makefile
How do you install this package in Ubuntu
Add CMake build
[Idea] Rewriting in LLVM DSL
Supporting mildly-broken clients and/or ICE/1.0
Conan package for http-parser
Test "CONNECT_WITH_BODY_REQUEST" maybe worng
Need to consider the noBody situation for HEAD method
Group related tests into files
Convert test suite to TAP output
HTTP/0.9 does not have header fields
Makefile is broken for OS X
install `package'
add .deps and .dirstamp to .gitignore
[WIP] CMake Support
Add basic CMake support
ignore headers transfer_encoding_chunked and content_length to work with http assemblers.
Cython bindings -- Interested?
Unbreak `make install` in BSDs
```
#### roadmap

Expected:
```
Should Node.js be VM neutral in the future?
Community polling program
html from markdown
About NG on ROADMAP.md
Roadmap Translations and Speakers
Gathering feedback from companies.
What do you want to see from a roadmap?
Building node as a shared library instead of an executable
Process considerations, 3rd party inspiration
Notifications for TC meetings.
Consensus on roadmap?
Opt-in feedback reports
Tools for engaging a larger portion of the community.
What is your biggest pain point w/ Node?
```

Actual:
```
Should Node.js be VM neutral in the future?
Community polling program
html from markdown
About NG on ROADMAP.md
Roadmap Translations and Speakers
Gathering feedback from companies.
What do you want to see from a roadmap?
Building node as a shared library instead of an executable
Process considerations, 3rd party inspiration
Notifications for TC meetings.
Consensus on roadmap?
Opt-in feedback reports
Tools for engaging a larger portion of the community.
What is your biggest pain point w/ Node?
```
#### docker-iojs

Expected:
```
Reduce Image Size - Alpine Linux, update apk question
Automated tests of docker images testing
Consider alpine/busybox base image idea
Security issue: iojs is run as root discussion
```

Actual:
```
Reduce Image Size - Alpine Linux, update apk
Automated tests of docker images
Consider alpine/busybox base image
Run as a non-privileged user by default
Security issue: iojs is run as root
```
#### build-container-sync

Expected:
```
remove semicolon :)
```

Actual:
```
remove semicolon :)
```

The API is functioning as expected. In http-parser and docker-iojs where there are issues that the function found that aren't listed, these are found in the pull requests in the repo. This is because the API includes pull requests with issues, even if there are issues that aren't pull requests.

### Intermediate loading state 

I'm not sure how to test for this. I can see it loading. Then it disappears after it has the information. 

### Handle errors while requesting the API by logging to the console

The API works as expected while online. To test if the errors get logged to the console, I ran the function while not connected to the internet. I also expect this to happen if the Github site was down.

Expected:
```
Get list of repos failed
```

Actual:
```
Get list of repos failed
```

The 'Loading...' also didn't change. 

### Only request issues once per repository

To check that the request would only run once, I checked the Network tab under the Inspector (Google Chrome) to see what requests are being made. When each repository is clicked, it doesn't matter how many times it is clicked, the request only runs once for that repository.