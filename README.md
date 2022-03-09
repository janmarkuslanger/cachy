# cachy

Cachy adds a caching layer to your javascript clients. 
It is designed to add your own storages (plain objects, local storage and more), clients (like axios, fetch and more) and caching strategies. 

# Tutorial

Code can be found in `demo`.

Let´s assume following requirements. 
We have an app that performs lots of request, especially get requests. 
Many request responses won´t change in a lont time. 
So there will be many calls against the server that aren´t necessary.

As a result we want following things

- caching `get` calls 
- storing response in local storage
- after performing a request it should get stored for 60 seconds. After that time the response should be renewed
- using `window.fetch` 

`Cachy` doesn´t provide that requirements out of the box (there will be implemtations in the future for storage, caching and co.) but the library 
provides useful interfaces, classes and methods that will help you to create it by your own. Plus: you can change caching strategies and storage later without rewriting everything. 

Following the requirements we need to do:

- creating our `Client` class that redirects requests between `Cachy` and `window.fetch`
- creating our `Cache` class that handles the caching logic
- creating our `Storage` class that will store responses into the local storage

- setup up `Cachy`

# API
