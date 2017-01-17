  AFRAME.registerSystem('persist', {
    schema: {
      savekey: {
        type: 'int',
        default: 0 // 13 = enter, cf https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#Value_of_keyCode
      },
    },
    init: function () {
      this.entities = [];
      window.addEventListener("unload", saveAll);
  
      if (this.data.savekey) document.addEventListener("keydown", keyDown, false);
      var entities = this.entities;
      var savekey = this.data.savekey;

      function saveAll(){
          for (var i = 0; i < entities.length; i++) {
            document.getElementById(entities[i].id).components[entities[i].attrName].saveValue();
          }
      }

      function forgetAll(){
          for (var i = 0; i < entities.length; i++) {
            document.getElementById(entities[i].id).components[entities[i].attrName].forgetValue();
          }
      }

      function keyDown(e) {
        var keyCode = e.keyCode;
        if(keyCode==savekey) {
          console.log("Manual save");
          saveAll();
        }
      }
      
    },
    registerMe: function (el) {
      this.entities.push(el);
    }
  });
  
  
  AFRAME.registerComponent('persist', {
    multiple: true,
    // arguably could have been better to accept a list of attributes to save
    schema: {
      attribute: {
        type: 'string',
        default: 'position'
      },
      debug: {
        type: 'boolean',
        default: false
      }
    },
    
    init: function () {
      if (!this.el.id){
        console.log("error", this.attrName, "requires an element id on your entity");
        return;
      }
      this.data.storageName = this.attrName+'_'+this.el.id+'_'+this.data.attribute;
      this.loadValue();
      if (this.data.debug) console.log(this.data.storageName);
      this.system.registerMe({attrName: this.attrName, id: this.el.id})
    },
    
    loadValue: function(){
      let savedValue =  localStorage.getItem(this.data.storageName);
      if (savedValue){
        if (this.data.debug) console.log('Previous value of', this.data.attribute, 'for', savedValue,
                                         'saved from', this.data.storageName, ', using it');
        this.el.setAttribute(this.data.attribute, savedValue);
      }
    },
    
    saveValue: function(){
      let attributeValue = this.el.getAttribute(this.data.attribute);      
      if ((this.data.attribute == "position") || (this.data.attribute == "rotation"))
        localStorage.setItem(this.data.storageName, AFRAME.utils.coordinates.stringify(attributeValue));
      else
        localStorage.setItem(this.data.storageName, attributeValue);      
      
      if (this.data.debug) console.log(this.data.storageName, 'saved', this.data.attribute, 'of value', attributeValue);   
    },
    
    forgetValue: function(){
      if (this.data.debug) console.log(this.data.storageName, 'deleted'); 
        localStorage.removeItem(this.data.storageName);
    }
    
  });
