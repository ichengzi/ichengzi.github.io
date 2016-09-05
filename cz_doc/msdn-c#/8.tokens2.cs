// tokens2.cs
using System;
using System.Collections;

public class Tokens2 : IEnumerable
{
    private string[] elements;

    Tokens2(string source, char[] delimiters)
    {
        elements = source.Split(delimiters);
    }

    // IEnumerable Interface Implementation:

    public TokenEnumerator GetEnumerator() // non-IEnumerable version
    {
        return new TokenEnumerator(this);
    }

    IEnumerator IEnumerable.GetEnumerator() // IEnumerable version
    {
        return (IEnumerator)new TokenEnumerator(this);//声明两个版本
    }

    // Inner class implements IEnumerator interface:

    public class TokenEnumerator : IEnumerator
    {
        private int position = -1;
        private Tokens2 t;

        public TokenEnumerator(Tokens2 t)
        {
            this.t = t;
        }

        public bool MoveNext()
        {
            if (position < t.elements.Length - 1)
            {
                position++;
                return true;
            }
            else
            {
                return false;
            }
        }

        public void Reset()
        {
            position = -1;
        }

        //声明两个版本
        public string Current // non-IEnumerator version: type-safe
        {
            get
            {
                return t.elements[position];
            }
        }

        object IEnumerator.Current // IEnumerator version: returns object
        {
            get
            {
                return t.elements[position];
            }
        }
    }

    // Test Tokens, TokenEnumerator

    static void Main()
    {
        Tokens2 f = new Tokens2("This is a well-done program.",
           new char[] { ' ', '-' });
        foreach (string item in f) // try changing string to int
        {
            Console.WriteLine(item);
        }
    }
}