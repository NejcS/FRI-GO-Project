
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
        //console.log("js ready!");
        
        
        var defaultWidth  = 1920;
        var defaultHeight = 1080;
        
        
        var c = document.getElementById("c");
        var ctx = c.getContext("2d");
        
        c.width  = window.innerWidth;
        c.height = window.innerHeight;
        
        var bg = $("#bg");
        
        // The characters
        var chars = "01";
        
        var fontSize = 12;
        var numColumns = c.width / fontSize;
        
        var getNumCharsInLine = function(char)
        {
            var measuredTextWidth = 0;
            var line = "";
            while ( measuredTextWidth < c.width )
            {
                line += char;
                
                measuredTextWidth = ctx.measureText( line ).width;
            }
            
            return measuredTextWidth;
        }
        
        var generateLine = function()
        {
            var line = "";
            var numChars = getNumCharsInLine( "0" );
            
            var char;
            for (var i = 0; i < numChars; i++)
            {
                char = chars.charAt(
                    Math.floor(
                        Math.random() * chars.length
                    )
                );
                
                line += char;
            }
            
            return line;
        }
        
        var lines = [];
        var numLines = c.height / fontSize;
        for (var i = 0; i < numLines; i++)
        {
            line = generateLine();
            
            lines[i] = line;
        }
        
        
        function generateAlphas(min, max, step)
        {
            var arr = [];
            
            for (var alpha = min; alpha <= max; alpha += step)
            {
                alpha = parseFloat( alpha.toFixed(2) );
                
                arr.push( alpha );
            }
            for (var alpha = max - step; alpha >= min; alpha -= step)
            {
                alpha = parseFloat( alpha.toFixed(2) );
                
                arr.push( alpha );
            }
            
            return arr
        }
        
        var alphaMin = 0.6;
        var alphaMax = 0.82;
        var alpha = alphaMax;
        var alphaDelta = 0.02;
        var lineAlphaMax = 0;
        
        var bgNumberChangePerc = 0.99;
        
        var alphas = generateAlphas( alphaMin, alphaMax, alphaDelta );
        //console.log(alphas);
        
        
        function draw()
        {
            ctx.clearRect(
                0, 0,
                c.width, c.height
            );
            
            
            ctx.font = fontSize + "px consolas";
            
            
            if ( lineAlphaMax < lines.length + alphas.length )
                lineAlphaMax++;
            else
                lineAlphaMax = 0;
            
            var line;
            for (var i = 0; i < lines.length; i++)
            {
                line = lines[i];
                
                // Change some of the line
                var split = line.split("");
                line = "";
                for (var j = 0; j < split.length; j++)
                {
                    if ( Math.random() > bgNumberChangePerc )
                    {
                        if ( split[j] == "0" )
                            split[j] = 1;
                        else if ( split[j] == "1" )
                            split[j] = 0;
                    }
                    
                    line = line.concat( split[j] );
                }
                
                
                alpha = alphaMin;
                if ( i > lineAlphaMax-alphas.length  &&  i < lineAlphaMax+alphas.length )
                    alpha = alphas[ i + (alphas.length - 1 - lineAlphaMax) ];
                
                ctx.fillStyle = "rgba(70, 70, 70, " + alpha + ")";
                ctx.fillText(
                    line,
                    0,            // X coord
                    i * fontSize  // Y coord
                );
            }
        }
        
        setInterval(
            draw,
            33
        );// tODO fixed framerate for everything
        
        
        /*
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
                //if ( ratioWidth < ratioHeight )
                //    ratio = ratioHeight;
                
                bg.css(
                    "zoom", ratio
                );
            }
        );
        */
    }
);
