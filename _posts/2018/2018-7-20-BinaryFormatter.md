## Version Problem

Humm, you see, by adding a field, you are breaking compatibility, I'm not sure of your scenario, but you might be trying to deserialize an object from an older version, it will break in that case. When you add a field to a serializable class, you should mark it with [OptionalField ] attribute, this way it will work with all versions. Try that and see if the breaks cease to happen.

Also, never remove a field or mark it as NonSerialized when updating a class.

https://social.msdn.microsoft.com/Forums/en-US/9a53f2b1-5bb7-41e7-9134-c2e932358b7a/troubles-with-binaryformatter?forum=csharplanguage


## BCLDebug ---- Enadble MEF tracing and WCF tracing in app.config

[MSDN forum link](https://social.msdn.microsoft.com/Forums/vstudio/en-US/35f41d75-8844-41b9-8955-7c36d0713029/enabling-binaryformatter-trace?forum=netfxbcl)

This is not achievable as **BCLDebug is with conditional compile option** while the public library doesn't have that.

``` xml
<system.diagnostics>
    <trace autoflush="true" indentsize="4" />
    <sources>
      <source name="System.ComponentModel.Composition"
              switchValue="All">
        <listeners>
          <add name="fileListener"
               type="System.Diagnostics.TextWriterTraceListener"
               initializeData="_Composition.log" />
        </listeners>
      </source>
    </sources>
  </system.diagnostics>

  <system.diagnostics>
    <trace autoflush="true" indentsize="4" />
    <sources>
      <source name="System.ServiceModel"
              switchValue="Information, ActivityTracing"
              propagateActivity="true">
        <listeners>
          <add name="messages"
          type="System.Diagnostics.XmlWriterTraceListener"
          initializeData="_messages.svclog" />
        </listeners>
      </source>
    </sources>
  </system.diagnostics>
```

## MemoryStream.GetBuffer()

Note that the buffer contains allocated bytes which might be unused. For example, **if the string "test" is written into the MemoryStream object, the length of the buffer returned from GetBuffer is 256, not 4, with 252 bytes unused**. To obtain only the data in the buffer, use the ToArray method; however, ToArray creates a copy of the data in memory.