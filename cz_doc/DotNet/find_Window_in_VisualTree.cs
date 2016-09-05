public static bool FindMainWindow(DependencyObject obj) 
{
    while (obj != null)
    {
        var objTest = obj as Window;
        if (objTest != null)
            return true;
        obj = VisualTreeHelper.GetParent(obj);
    }
    return false;
}


public static T FindAncestorOrSelf<T>(DependencyObject obj) where T : DependencyObject
{
    while (obj != null)
    {
        var objTest = obj as T;
        if (objTest != null)
            return objTest;
        obj = VisualTreeHelper.GetParent(obj);
    }
    return null;
}