import {
  ifVar,
  map,
  rule,
  writeToProfile,
  Manipulator,
} from 'karabiner.ts'

/**
 * Shortcut for "open" shell command
 */
export function open(what: string): string {
  return `open ${what}`
}

/**
 * Shortcut for managing window sizing with Raycas
 */
export function windowManagement(name: string): string {
  return `open -g raycast://extensions/raycast/window-management/${name}`
}

const layerManipulators = (layer: string) => (manipulators: Array<ReturnType<typeof map>>) => {
  return rule(`hyper-${layer}`, ifVar(`${layer}_layer`, 1)).manipulators(manipulators.map(m => m.toVar(`${layer}_layer`, 0)))
}

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config json into console)
// + Create a new profile if needed.
writeToProfile('Default', [
  rule('Caps Lock → Hyper').manipulators([
    map('caps_lock').toHyper().toIfAlone('escape'),
  ]),
  // o = "Open"
  rule('Hyper Layers').manipulators([
    map('o', 'Hyper').toVar('o_layer', 1),
    map('a', 'Hyper').toVar('a_layer', 1),
    map('d', 'Hyper').toVar('d_layer', 1),
    map('w', 'Hyper').toVar('w_layer', 1),
    map('s', 'Hyper').toVar('s_layer', 1),
    map('v', 'Hyper').toVar('v_layer', 1),
    map('c', 'Hyper').toVar('c_layer', 1),
    map('r', 'Hyper').toVar('r_layer', 1),
  ]),
  layerManipulators('o')([
    map('q').toApp("1Password"),
    map('u').toApp("Proton Pass"),
    map('a').toApp("Arc"),
    map('s').toApp("Slack"),
    map('d').toApp("Figma"),
    map('n').toApp("Obsidian"),
    map('t').toApp("Kitty"),
    map('m').toApp("Multi"),
    map('f').toApp("Finder"),
    map('p').toApp("Spotify"),
    map('w').toApp("Texts"),
    map('e').toApp("Zed Preview"),
  ]),
  // a = "Arc"
  layerManipulators('a')([
    map('s').to$(open("raycast://extensions/the-browser-company/arc/search-spaces")),
    map('f').to$(open("raycast://extensions/the-browser-company/arc/search")),
    map('t').to$(open("raycast://extensions/the-browser-company/arc/search-tabs")),
  ]),
  // d = "Dev"
  layerManipulators('d')([
    map('s').toApp("Simulator"),
    map('f').toApp("Figma"),
    map('h').toApp("HTTPie"),
  ]),
  // w = "Window"
  layerManipulators('w')([
    // Hide window
    map('semicolon').to('h', 'right_command'),
    map('y').to$(windowManagement("previous-display")),
    map('o').to$(windowManagement("next-display")),
    map('k').to$(windowManagement("top-half")),
    map('j').to$(windowManagement("bottom-half")),
    map('h').to$(windowManagement("left-half")),
    map('l').to$(windowManagement("right-half")),
    map('f').to$(windowManagement("maximize")),
    map('a').to$(windowManagement("almost-maximize")),
    // Previous tab
    map('u').to('tab', ['right_command', 'right_shift']),
    // Next tab
    map('i').to('tab', 'right_control'),
    // Next window
    map('n').to('grave_accent_and_tilde', 'right_command'),
    // window back
    map('b').to('open_bracket', 'right_command'),
    // Window forward
    map('m').to('close_bracket', 'right_command'),
    // Windo next display
    map('d').to('right_arrow', ["right_control", "right_option", "right_command"]),
  ]),
  // s = "search"
  layerManipulators('s')([
    // Magicmove via homerow.app
    map('m').to('f', ["right_shift", "right_command"]),
    // Scroll mode via homerow.app
    map('j').to('j', ["right_shift", "right_command"]),
    map('k').to('d', ["right_shift", "right_command"]),
    map('u').to('page_down'),
    map('i').to('page_up'),
  ]),
  // r = "Raycast"
  layerManipulators('r')([
    map('n').to$(open("raycast://script-commands/notifications")),
    map('d').to$(open('raycast://extensions/yakitrak/do-not-disturb/toggle')),
    // map('e').to$(open('raycast://extensions/FezVrasta/emoji/emoji')),
    map('e').to$(open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols")),
    map('c').to$(open("raycast://extensions/raycast/system/open-camera")),
    map('p').to$(open("raycast://extensions/raycast/raycast/confetti")),
    map('a').to$(open("raycast://extensions/raycast/raycast-ai/ai-chat")),
    map('s').to$(open("raycast://extensions/raycast/silent-mention/index")),
    map('h').to$(open("raycast://extensions/raycast/clipboard-history/clipboard-history")),
    map('y').to$(open("raycast://extensions/koinzhang/copy-path/copy-path")),
    map('l').to$(open("raycast://extensions/raycast/system/lock-screen")),
  ])
])
