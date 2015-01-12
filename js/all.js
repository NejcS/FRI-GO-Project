// Starts after document is ready
$( document ).ready( function() {

    var chromium = 'void UpdateBookmarkPositioning( const sync_pb::SyncEntity& update, syncable::ModelNeutralMutableEntry* local_entry) { // Update our unique bookmark tag.  std::string bookmark_tag = GetUniqueBookmarkTagFromUpdate(update); if (UniquePosition::IsValidSuffix(bookmark_tag)) { local_entry->PutUniqueBookmarkTag(bookmark_tag); } // Update our position. UniquePosition update_pos =   GetUpdatePosition(update, local_entry->GetUniqueBookmarkTag()); if (update_pos.IsValid()) { local_entry->PutServerUniquePosition(update_pos); } } }  // namespace void UpdateServerFieldsFromUpdate( syncable::ModelNeutralMutableEntry* target, const sync_pb::SyncEntity& update, const std::string& name) { if (update.deleted()) { if (target->GetServerIsDel()) { // If we already think the item is server-deleted, we\'re done. // Skipping these cases prevents our committed deletions from coming // back and overriding subsequent undeletions.  For non-deleted items, // the version number check has a similar effect. return; } // The server returns very lightweight replies for deletions, so we don\'t // clobber a bunch of fields on delete. target->PutServerIsDel(true); if (!target->GetUniqueClientTag().empty()) { // Items identified by the client unique tag are undeletable; when // they\'re deleted, they go back to version 0. target->PutServerVersion(0); } else { // Otherwise, fake a server version by bumping the local number. target->PutServerVersion( std::max(target->GetServerVersion(), target->GetBaseVersion()) + 1); } target->PutIsUnappliedUpdate(true); return; }';
    var doom3d = ' for (i = 0; i < ::g->numsectors; i++) { if (::g->sectors[ i ].tag == tag ) { thinker = ::g->thinkercap.next; for (thinker = ::g->thinkercap.next;  thinker != &::g->thinkercap;  thinker = thinker->next) { // not a mobj if (thinker->function.acp1 != (actionf_p1)P_MobjThinker) continue;    m = (mobj_t *)thinker; // not a teleportman if (m->type != MT_TELEPORTMAN ) continue; sector = m->subsector->sector; // wrong sector if (sector-::g->sectors != i ) continue;    oldx = thing->x; oldy = thing->y; oldz = thing->z; if (!P_TeleportMove (thing, m->x, m->y)) return 0; thing->z = thing->floorz;  //fixme: not needed? if (thing->player) thing->player->viewz = thing->z+thing->player->viewheight; // spawn teleport fog at source and destination fog = P_SpawnMobj (oldx, oldy, oldz, MT_TFOG); S_StartSound (fog, sfx_telept); an = m->angle >> ANGLETOFINESHIFT; fog = P_SpawnMobj (m->x+20*finecosine[an], m->y+20*finesine[an] , thing->z, MT_TFOG); // emit sound, where? S_StartSound (fog, sfx_telept); // don\'t move for a bit if (thing->player) thing->reactiontime = 18; thing->angle = m->angle; thing->momx = thing->momy = thing->momz = 0; return 1; } } }return 0;';
    var linux = 'static void async_run_entry_fn(struct work_struct *work){struct async_entry *entry =container_of(work, struct async_entry, work);unsigned long flags;ktime_t uninitialized_var(calltime), delta, rettime;/* 1) run (and print duration) */if (initcall_debug && system_state == SYSTEM_BOOTING) {pr_debug("calling  %lli_%pF @ %i\\n",(long long)entry->cookie,entry->func, task_pid_nr(current));calltime = ktime_get();}entry->func(entry->data, entry->cookie);if (initcall_debug && system_state == SYSTEM_BOOTING) {rettime = ktime_get();delta = ktime_sub(rettime, calltime);pr_debug("initcall %lli_%pF returned 0 after %lld usecs\\n",(long long)entry->cookie,entry->func,(long long)ktime_to_ns(delta) >> 10);}/* 2) remove self from the pending queues */spin_lock_irqsave(&async_lock, flags);list_del_init(&entry->domain_list);list_del_init(&entry->global_list);/* 3) free the entry */kfree(entry);atomic_dec(&entry_count);spin_unlock_irqrestore(&async_lock, flags);/* 4) wake up any waiters */wake_up(&async_done);}';
    
    var chromiumLines = [];
    var doomLines = [];
    var linuxLines = [];

    // The default viewport width and height
    var defaultWidth  = 1920;
    var defaultHeight = 1080;
    
    var c = document.getElementById("c");
    var ctx = c.getContext("2d");
    
    c.width  = defaultWidth;
    c.height = defaultHeight;
    
    var bg = $( "#bg" );
    var bgColor = $( "body" ).css( "background-color" );
    
    // The characters
    var chars = "01";
    
    var fontSize = 12;
    var fontType = "Inconsolata";
    var fontLineSpacing = 2;
    
    // dis be even, YO!
    var charsPerLine = 50;
    
    var getNumCharsInLine = function(char) {
        ctx.font = fontSize + "px" + " " + fontType;
        
        var num = Math.ceil( defaultWidth / ctx.measureText("0").width );
        num++;  // So it covers the right edge
        
        return num - 1;
    }
    
    var generateLine = function() {
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
    
    var getNumLines = function() {
        return Math.ceil( defaultHeight / ( fontSize + fontLineSpacing ) );
    }
    
    // Generate lines
    
    var lines = [];
    var numLines = getNumLines();
    numLines++;  // So it covers the bottom edge.
    
    for (var i = 0; i < numLines; i++)
    {
        line = generateLine();
        
        lines[i] = line;
    }
    
    
    function generateAlphas(min, max, step) {
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
    
    function drawLineOfText(string, posX, posY, fontCharWidth, bgColor) {
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

    function setLinesOfCode() {
        // to make the code more readable;
        var x = charsPerLine;
        
        // CHROMIUM
        var i = 0;
        for ( ; i < 12; i++ ) {
            chromiumLines.push( chromium.substr( x * i, x ) );
        }

        for ( ; i < 20; i++ ) {
            chromiumLines.push( chromium.substr( (x/2) * i, x/2 ) );   
        }

        // DOOM 3D
        i = 0;
        for ( ; i < 6; i++ ) {
            doomLines.push( doom3d.substr( x * i, x ) );
        }

        for ( ; i < 14; i++ ) {
            doomLines.push( doom3d.substr( (x/2) * i, x/2 ) );
        }

        // LINUX
        i = 0;
        for ( ; i < 14; i++ ) {
            var newLine = linux.substr( x * i, x/2 );
            linuxLines.push( newLine );
        }
    }
    
    function draw() {
        ctx.clearRect(
            0, 0,
            c.width, c.height
        );
        
        
        ctx.font = fontSize + "px Inconsolata";
        var fontCharWidth = ctx.measureText("0").width;
        
        if ( lineAlphaMax < lines.length + alphas.length )
            lineAlphaMax++;
        else
            lineAlphaMax = 0;
        
        var line;
        for (var i = 0; i < lines.length; i++) {
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
            
            
            
            // Draw the line
            alpha = alphaMin;
            if ( i > lineAlphaMax - alphas.length  &&  i < lineAlphaMax + alphas.length )
                alpha = alphas[ i + (alphas.length - 1 - lineAlphaMax) ];
            
            ctx.fillStyle = "rgba(70, 70, 70, " + alpha + ")";
            ctx.fillText(
                line,
                0,                                  // X coord
                i * ( fontSize + fontLineSpacing )  // Y coord
            );
        }
        
        // chromium
        posX = 47;
        posY = 24;

        for (var i = 0; i < chromiumLines.length; i++) {
            
            if (i == 6) posY += 3;

            drawLineOfText(chromiumLines[i], posX, posY, fontCharWidth, bgColor);

            posY += 1;
        }

        // doom 3d

        posX = 107;
        posY = 33;

        for (var i = 0; i < doomLines.length; i++) {
            drawLineOfText(doomLines[i], posX, posY, fontCharWidth, bgColor);

            posY += 1;
        }

        // linux

        posX = 167;
        posY = 33;

        for (var i = 0; i < linuxLines.length; i++) {
            drawLineOfText(linuxLines[i], posX, posY, fontCharWidth, bgColor);

            posY += 1;
        }
    }
    
    var alphaMin = 0.6;
    var alphaMax = 0.82;
    var alpha = alphaMax;
    var alphaDelta = 0.02;
    var lineAlphaMax = 0;
    
    var bgNumberChangePerc = 0.99;
    
    var alphas = generateAlphas( alphaMin, alphaMax, alphaDelta );
    
    // fill up arrays doomLines, chromiumLines and linuxLines
    setLinesOfCode();

    setInterval(
        draw,
        1000 / 30  // TODO RAF method, using fixed fps for everything
    );
});