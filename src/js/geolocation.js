navigator.geolocation.getCurrentPosition(
    function(position)
    {
        console.log(position);
        //действия с полученными данными
    },
    function(error)
    {
        // если ошибка (можно проверить код ошибки)
        if(error.PERMISSION_DENIED)
        {
            console.log("В доступе отказано!");
        }
});

