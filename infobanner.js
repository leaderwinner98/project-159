AFRAME.registerComponent('info-banner', {
    schema: {
      selectedItemId: { type: 'string', default: '' }
    },
  
    init: function() {
      this.handleMouseClickEvents = this.handleMouseClickEvents.bind(this);
      this.el.addEventListener('click', this.handleMouseClickEvents);
    },
  
    // Handle mouse click events
    handleMouseClickEvents: function(event) {
      const el = event.detail.intersectedEl;
  
      // Deselect the current item if a different one is selected
      if (this.data.selectedItemId && this.data.selectedItemId !== el.id) {
          const previousEl = document.getElementById(this.data.selectedItemId);
          previousEl.setAttribute('material', 'color: red');
      }
  
      // Select the new item and change its color
      this.data.selectedItemId = el.id;
      el.setAttribute('material', 'color: blue');
  
      // Show the info banner
      this.showInfoBanner(el.id);
    },
  
    // Show info banner based on the selected item
    showInfoBanner: function(itemId) {
      const banner = document.getElementById('infoBanner');
  
      // Create the banner contents based on the itemId
      const content = this.createBannerContent(itemId);
  
      // Update the banner entity with the content
      banner.setAttribute('geometry', 'primitive: plane; width: 4; height: 2;');
      banner.setAttribute('material', 'color: white;');
      banner.setAttribute('position', '0 1 0');
  
      banner.innerHTML = content;
  
      // Make the banner visible
      banner.setAttribute('visible', true);
    },
  
    // Create the banner content
    createBannerContent: function(itemId) {
      let title = '';
      let description = '';
      let imageUrl = '';
  
      switch (itemId) {
        case 'comics':
          title = 'Comic Series';
          description = 'A popular comic series...';
          imageUrl = 'url-to-comic-image.jpg';
          break;
        default:
          title = 'Unknown';
          description = 'Information not available';
      }
  
      // Return the HTML content
      return `
        <a-entity position="0 0.5 0">
          <a-text value="${title}" color="black" align="center" width="3"></a-text>
        </a-entity>
        <a-entity position="0 0 -0.5">
          <a-text value="${description}" color="black" align="center" width="3"></a-text>
        </a-entity>
      `;
    }
  });
  