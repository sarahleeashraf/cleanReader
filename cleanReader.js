
$(function() {
	$('a').each(function() {
		var uri = this.href;
	
		if (uri.match(/^http:\/\/www.slate.com\/id\//))
		{
		
			
			var path = uri.split(/http:\/\/www.slate.com\/id\//)[1];
			
			
			if (path.match(/^[0-9]{7}\/$/)) {
			
				var id = path.split(/\//)[0];
				this.href = 'http://www.slate.com/toolbar.aspx?action=print&id=' + id;
				$(this).css({'background-color':'#def'});
			}
			
			else {
				/*$(this).css({
					'display':'block',
					'border':'1px solid #00f',
					'background-color':'#0cf',
					'color':'#fff'		
				});*/
			}
			
		}
	
	});
		
});

