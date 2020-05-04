<?php
    function write_module_define_script(){
?>

<script type="text/javascript">

    "use strict";

absol.ShareCreator.templatebox = function(){
    var res = absol.buildDom({
        class:'tlb',
        extendEvent:['deleteitem', 'edititem', 'clickitem', 'clicklink'],
        child: [
            'a.tlb-link',
            '.tlb-list'
        ]
    });
    res.$list = absol.$('.tlb-list', res);
    res.$link = absol.$('.tlb-link', res);
    res.$link.on('click', function(event){
        res.emit('clicklink', event, res);
    });
    return res;
};

absol.ShareCreator.templatebox.prototype.removeItem = function(item){
    this._items =this._items.filter(function(e){
        return e != item;
    });
    Array.prototype.forEach.call(this.$list.childNodes, function(elt){
        if (elt.dataHolder == item) elt.selfRemove();
    });
}

absol.ShareCreator.templatebox.prototype.editItem = function(item){
    Array.prototype.forEach.call(this.$list.childNodes, function(elt){
        if (elt.dataHolder.value == item.value) elt.innerHTML = item.text;
    });
}

absol.ShareCreator.templatebox.prototype.addNewItem = function(item){
    var box = this;
    this._items.push(item);
    var itemElt = absol.buildDom({
        tag:'templateboxitem',
        props:{
            text:item.text,
            dataHolder: item
        },
        on:{
            pressdelete: function(event, me){
                event.templateboxItem = item;
                event.templateboxItemElt = this;
                box.emit('deleteitem', event, box);
            },
            pressedit: function(event, me){
                event.templateboxItem = item;
                event.templateboxItemElt = this;
                box.emit('edititem', event, box);
            },
            changeitem: function(event, me){
                event.templateboxItem = item;
                event.templateboxItemElt = this;
                box.emit('clickitem', event, box);
            }
        }
    });
    this.$list.addChild(itemElt);
}

absol.ShareCreator.templatebox.property = {};

absol.ShareCreator.templatebox.property.link = {
    set:function(link){
        this._link = link;
        this.$link.innerHTML = link.text;
        if (typeof(link.onclick)== 'function'){
            this.$link.onclick = link.onclick;
        }
    },
    get:function(){
        return this._link;
    }
}

absol.ShareCreator.templatebox.property.items = {
    set:function(items){
        var box = this;
        this._items = items||[];
        this.$list.clearChild();
        var val = false;
        this._items.forEach(function(item){
            var itemElt = absol.buildDom({
                tag:'templateboxitem',
                class: val ? "" : "templateboxitem-select",
                props:{
                    text:item.text,
                    dataHolder: item
                },
                on:{
                    pressdelete: function(event, me){
                        event.templateboxItem = item;
                        event.templateboxItemElt = this;
                        box.emit('deleteitem', event, box);
                    },
                    pressedit:function(event, me){
                        event.templateboxItem = item;
                        event.templateboxItemElt = this;
                        box.emit('edititem', event, box);
                    },
                    changeitem: function(event, me){
                        event.templateboxItem = item;
                        event.templateboxItemElt = this;
                        var oldItem = absol.$('.templateboxitem-select', box);
                        oldItem.classList.remove('templateboxitem-select');
                        event.templateboxItemElt.classList.add("templateboxitem-select");
                        box.emit('clickitem', event, box);
                    }
                }
            });
            val = true;
            this.$list.addChild(itemElt);
        }.bind(this));
    },
    get:function(){
      return this._items;
    }
};

absol.ShareCreator.templateboxitem = function(){
    var res = absol.buildDom(
            '<div class="tbl-item">\
                <div class="template-text-container"><span></span></div>\
                <div class ="tbl-item-button-container">\
                    <a class="material-icons edit">edit</a>\
                    <a class="material-icons delete">delete</a>\
                </div>\
            </div>'
        );
    res.eventHandler = absol.OOP.bindFunctions(res, absol.ShareCreator.templateboxitem.eventHandler);
    res.defineEvent(['pressdelete','pressedit', 'changeitem']);
    res.$editBtn = absol.$('a.edit', res).on('click', res.eventHandler.clickEditBtn);
    res.$deleteBtn = absol.$('a.delete', res).on('click', res.eventHandler.clickDeleteBtn);
    res.$nametext = absol.$('.template-text-container', res).on('click', res.eventHandler.clickChangeItem);
    res.$span = absol.$('span', res);
    return res;
};

absol.ShareCreator.templateboxitem.eventHandler = {};
absol.ShareCreator.templateboxitem.eventHandler.clickDeleteBtn = function(event){
    this.emit('pressdelete', event, this);
};

absol.ShareCreator.templateboxitem.eventHandler.clickEditBtn = function(event){
    this.emit('pressedit', event, this);
};

absol.ShareCreator.templateboxitem.eventHandler.clickChangeItem = function(event){
    this.emit('changeitem', event, this);
};


absol.ShareCreator.templateboxitem.property = {
    text:{
        set:function(value){
            this.$span.clearChild();
            this.$span.addChild(document.createTextNode(value));
        },
        get:function(){
            return this.$span.innerHTML;
        }
    },
};
</script>


<?php } ?>
