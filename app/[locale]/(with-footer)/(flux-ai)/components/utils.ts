export function medalFormatPrompt(prompt: string, keywords: string[]) {
  return (
    `Create a stunning ${keywords[0] || ''} shaped ${keywords[1] || ''} medal based on ${prompt}.` +
    'Style: Photorealistic, highly detailed. ' +
    'Setting: In an elegant indoor scene. ' +
    'Lighting: Soft side lighting with highlights and shadows. ' +
    'Mood: Solemn, honorable, achievement. ' +
    'Color scheme: Gold, silver, bronze as main colors, complemented by a dark background. ' +
    'Composition: The medal positioned in the center, slightly tilted to show depth, blurred background to highlight the subject. ' +
    'Ultra high resolution 8K render, tack sharp, rich textures. No text or watermarks.'
  );
}

export function animeFormatPrompt(prompt: string, keywords: string[]) {
  return (
    `Create a stunning ${keywords[0] || ''} anime image of ${prompt}.` +
    'Style: Highly stylized, vibrant colors. ' +
    'Setting: Suitable anime environment. ' +
    'Lighting: Dramatic shadows/highlights. ' +
    'Mood: Befitting anime genre. ' +
    'Color scheme: Vivid harmonious palette. ' +
    'Composition: Dynamic, cinematic highlighting subject(s). ' +
    'High-quality 8K render, ultra-sharp animation linework/textures. No text/watermarks.'
  );
}
