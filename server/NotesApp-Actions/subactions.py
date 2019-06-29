def mix_colors(rgb1, rgb2):
    rgb = {}
    rgb['r'] = rgb1['r'] - ((rgb1['r'] - rgb2['r']) / 2)
    rgb['g'] = rgb1['g'] - ((rgb1['g'] - rgb2['g']) / 2)
    rgb['b'] = rgb1['b'] - ((rgb1['b'] - rgb2['b']) / 2)
    
    return rgb