# Outline Web Manager
Outline Web Manager to view  and add the access keys.

## Files:
### [api-url.html](./api-url.html)
Uses the Access Keys Management API URL as input to access the server.

### [installation-output.html](./installation-output.html)
Uses the after installation output as input to access the server.

## About the Access Keys Management API

In order to utilize the Management API, you'll need to know the apiUrl for your Outline server.
You can obtain this information from the "Settings" tab of the server page in the Outline Manager.
Alternatively, you can check the 'access.txt' file under the '/opt/outline' directory of an Outline server. An example apiUrl is: https://1.2.3.4:1234/3pQ4jf6qSr5WVeMO0XOo4z.

See [Full API Documentation](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/Jigsaw-Code/outline-server/master/src/shadowbox/server/api.yml).
The OpenAPI specification can be found at [api.yml](https://github.com/Jigsaw-Code/outline-server/blob/master/src/shadowbox/server/api.yml).

### Examples

Start by storing the apiURL you see see in that file, as a variable. For example:

```
API_URL=https://1.2.3.4:1234/3pQ4jf6qSr5WVeMO0XOo4z
```

You can then perform the following operations on the server, remotely.

List access keys

```
curl --insecure $API_URL/access-keys/
```

Create an access key

```
curl --insecure -X POST $API_URL/access-keys
```

Get an access key (e.g. get access key 1)

```
curl --insecure $API_URL/access-keys/1
```

Rename an access key
(e.g. rename access key 2 to 'albion')

```
curl --insecure -X PUT -F 'name=albion' $API_URL/access-keys/2/name
```

Remove an access key
(e.g. remove access key 2)

```
curl --insecure -X DELETE $API_URL/access-keys/2
```

Set a data limit for all access keys
(e.g. limit outbound data transfer access keys to 1MB over 30 days)

```
curl -v --insecure -X PUT -H "Content-Type: application/json" -d '{"limit": {"bytes": 1000}}' $API_URL/experimental/access-key-data-limit
```

Remove the access key data limit

```
curl -v --insecure -X DELETE $API_URL/experimental/access-key-data-limit
```
