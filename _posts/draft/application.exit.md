### Winforms: Application.Exit vs Enviroment.Exit vs Form.Close

The proper method would be `Application.Exit()`. According to the [Documentation][1], it **terminates all message loops and closes all windows thus giving your forms the possibility to execute their cleanup code** (in Form.OnClose etc).

`Environment.Exit` would just kill the process. If some form has e.g. unsaved changes it would not have any chances to ask the user if he wants to save them. Also resources (database connections etc.) could not be released properly, files might not be flushed etc.

`Form.Close` just does what it says: it closes a form. If you have other forms opened (perhaps not now but in some future version of your application), the application will not terminate.

Keep in mind that if you use multithreading, `Application.Exit()` will not terminate your threads (and thus the application will keep working in the background, even if the GUI is terminated). Therefore you must take measures to kill your threads, either in the main function (i.e. `Program.Main()`) or when in the `OnClose` event of your main form.


  [1]: http://msdn.microsoft.com/en-us/library/system.windows.forms.application.exit%28v=vs.80%29.aspx