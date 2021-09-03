# Redirector's Cut

Redirecting on the web is very common. You've almost certainly been given a shortened URL before like [twil.io/saxd](https://twil.io/saxd). That shortened link redirects you to another longer harder to remember URL. Another common pattern for redirects is to send your user to a log in screen.

TwiML provides you the same ability, you can redirect to another TwiML response by using the `<Redirect>` verb.

## `<Redirect>`

The TwiML verb `<Redirect>` can be placed in your code to immediately switch control to another TwiML response. The immediacy is _important_ to understand. Recall that TwiML happens in order from top to bottom. Once a `<Redirect>` is encountered, the remaining portion of your TwiML response will never execute.

The body of the `<Redirect>` verb should point to another URL that hosts TwiML. That URL could be fully qualified, meaning it includes the domain and the path, or absolute, meaning it starts with a `/`, or even relative to the current TwiML file.

This example redirects to a an absolute URL, meaning it's on the same server.

**Hosted at**: https://twimlillionaire.net/good-tunes

```xml
<Response>
    <Redirect>/sax-roll</Redirect>
    <Say>Can you hear it still?</Say>
</Response>
```

Notice how the `/sax-roll` is hosted on the same server. The slash means it's absolute and to start at the root.

**Hosted at**: https://twimlillionaire.net/sax-roll

```xml
<Response>
    <Say>Have you seen Epic Sax Guy yet? Google it.</Say>
</Response>
```

Remember, the "Can you hear it still?" from `<Say>` verb in the original `/good-tunes` TwiML file, will not happen because it will immediately be redirected when it hits the `<Redirect>` tag.

## Got it?

Flip back to the **Objective** tab and see if you can check off the correct answers in the **HACK** panel
