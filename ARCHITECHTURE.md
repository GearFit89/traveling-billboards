## Pages 
``` 
Route (app)                     Revalidate  Expire
┌ ○ /                                   1d      1y
├ ○ /_not-found
├ ○ /admin/dashboard
├ ○ /admin/dashboard/links
├ ○ /admin/dashboard/sections
├ ○ /admin/dashboard/signs
├ ○ /admin/dashboard/thought
├ ○ /admin/dashboard/thoughts
├ ƒ /api/keystatic/[...params]
├ ○ /chat
├ ○ /contact
├ ƒ /keystatic/[[...params]]
├ ƒ /links
├ ○ /links/search
├ ○ /login
├ ○ /login/admin
├ ○ /sign-up
├ ○ /signs
├ ƒ /signs/[id]
├ ○ /test_
└ ○ /user


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand 
```


