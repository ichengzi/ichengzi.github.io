### 多次bind问题

https://stackoverflow.com/questions/33511442/tinymapper-does-calling-tinymapper-bindttarget-tsource-cause-performance

https://github.com/TinyMapper/TinyMapper/issues/63


https://blog.ploeh.dk/2011/07/28/CompositionRoot/

``` cs
        private static Mapper GetMapper(TypePair typePair)
        {
            if (!_mappers.TryGetValue(typePair, out Mapper value))
            {
                value = _targetMapperBuilder.Build(typePair);
                _mappers[typePair] = value;
            }
            return value;
        }
```