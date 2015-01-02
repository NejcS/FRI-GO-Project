
/*
// Starts after everything is loaded (including images)
$(window).bind("load",
    function()
    {
    }
);
*/

// Starts after document is ready
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
        
        var bg = $( "#bg" );
        var bgColor = $( "body" ).css( "background-color" );
        
        // The characters
        var chars = "01";
        
        var fontSize = 12;
        var fontType = "consolas";
        var fontLineSpacing = 2;
        
        
        var getNumCharsInLine = function(char)
        {
            ctx.font = fontSize + "px" + " " + fontType;
            
            var num = Math.ceil( c.width / ctx.measureText("0").width );
            num++;  // So it covers the right edge
            //console.log( num );
            
            return num - 1;
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
        
        var getNumLines = function()
        {
            return Math.ceil( c.height / ( fontSize + fontLineSpacing ) );
        }
        
        
        // Generate lines
        
        var lines = [];
        var numLines = getNumLines();
        numLines++;  // So it covers the bottom edge.
        //console.log(numLines);
        
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
        
        function drawLineOfText(string, posX, posY, fontCharWidth, bgColor)
        {
            string = ' ' + string + ' ';
            
            // Draws a black rectangle so there are no bg nmbers behind the text
            ctx.beginPath();
            ctx.rect(
                posX * fontCharWidth,
                ( posY - 1 ) * ( fontSize + fontLineSpacing ) * 1.0075,  // 1.0075 is a correction
                string.length * fontCharWidth,
                1 * ( fontSize + fontLineSpacing )
            );
            ctx.fillStyle = bgColor;
            ctx.fill();
            
            ctx.fillStyle = "rgba(250, 240, 50, 1.0)";
            ctx.fillText(
                string,
                posX * fontCharWidth,
                posY * ( fontSize + fontLineSpacing )
            );
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
            
            
            //ctx.font = fontSize + "px consolas";
            ctx.font = fontSize + "px" + " " + "consolas";
            
            
            if ( lineAlphaMax < lines.length + alphas.length )
                lineAlphaMax++;
            else
                lineAlphaMax = 0;
            
            var line;
            for (var i = 0; i < lines.length; i++)
            {
                line = lines[i];
                
                // Change numbers in the line
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
                
                /*// TEST font (in line)
                if ( i == 20 )
                {
                    var lineTemp1 = line.substr( 0, 50 );
                    var lineTemp2 = line.substr( 50, line.length );
                    
                    var string = '<div id="oneandonly"><span><a>neki text</a></span></div>';
                    
                    lineTemp1 += " ";
                    lineTemp1 += string;
                    lineTemp1 += " ";
                    lineTemp1 += lineTemp2.substr(
                                     string.length,
                                     lineTemp2.length
                                 );
                    
                    line = lineTemp1;
                }*/
                
                
                // Draw the line
                alpha = alphaMin;
                if ( i > lineAlphaMax-alphas.length  &&  i < lineAlphaMax+alphas.length )
                    alpha = alphas[ i + (alphas.length - 1 - lineAlphaMax) ];
                
                ctx.fillStyle = "rgba(70, 70, 70, " + alpha + ")";
                ctx.fillText(
                    line,
                    0,                                  // X coord
                    i * ( fontSize + fontLineSpacing )  // Y coord
                );
            }
            
            
            // BEGIN TEST font (over line)
            
            var string = '<div id="oneandonly"><span><a>neki text</a></span></div>';
            var fontCharWidth = ctx.measureText("0").width;
            drawLineOfText(
                string,
                50, 21,
                fontCharWidth,
                bgColor
            );
            
            // END TEST font (over line)
        }
        
        setInterval(
            draw,
            1000/30  // TODO RAF method, using fixed fps for everything
        );
        
        
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
