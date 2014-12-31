
/*
// This loads after everything is loaded (including images)
$(window).bind("load",
    function()
    {
    }
);
*/

// Starts after document is ready.
$( document ).ready(
    function()
    {
        console.log("js ready!");
        
        
        var defaultWidth  = 1920;
        var defaultHeight = 1080;
        
        var bg = $("#bg");
        
        
        // Loads the bg div with zeros and ones
        var loadBg = function()
        {
            bg.width  = defaultWidth;
            bg.height = defaultHeight;
            
            
            var string = function getNumbers()
            {
                var string = "";
                var numNumbers = 10000;
                var numbers = "01";
                
                for (var i = 0; i < numNumbers; i++)
                {
                    string += numbers.charAt(
                        Math.floor(
                            Math.random() * numbers.length
                        )
                    );
                }
                
                return string;
            }
            
            bg.text(string);
        }
        
        var init = function()
        {
            console.log("init");
            
            loadBg();
        }
        
        init();
        
        
        $( window ).bind(
            "resize",
            function()
            {
                console.log("resize");
                
                
                // Resize the scene to fit the window
                
                var ratioWidth  = window.innerWidth  / defaultWidth;
                var ratioHeight = window.innerHeight / defaultHeight;
                console.log(ratioWidth + " " + ratioHeight);
                
                var ratio = ratioWidth;
                if ( ratioWidth < ratioHeight )
                    ratio = ratioHeight;
                
                bg.css(
                    "zoom", ratio
                );
            }
        );
    }
);
