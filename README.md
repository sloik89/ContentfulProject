Simple project shows how to works with contentful

# Install

npm i contentful

# Configure

```ts
import * as contentful from "contentful";
const client = contentful.createClient({
  space: "space_id",
  environment: "master",
  accessToken: "token",
});
```
