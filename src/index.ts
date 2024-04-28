import {
  ifVar,
  map,
  rule,
  writeToProfile,
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

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config json into console)
// + Create a new profile if needed.
writeToProfile('Default', [
  rule('Caps Lock → Hyper').manipulators([
    map('caps_lock').toHyper().toIfAlone('escape'),
  ]),
  // rule('Homerow mods').manipulators([
  //   // Left side
  //   map('a').to('left_control').toIfAlone('a'),
  //   map('r').to('left_option').toIfAlone('r'),
  //   map('s').to('left_command').toIfAlone('s'),
  //   map('t').to('left_shift').toIfAlone('t'),
  //   // Right side
  //   map('o').to('left_control').toIfAlone('o'),
  //   map('i').to('left_option').toIfAlone('i'),
  //   map('e').to('left_command').toIfAlone('e'),
  //   map('n').to('right_shift').toIfAlone('n'),
  // ]),
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
  rule('hyper-o', ifVar('o_layer', 1)).manipulators([
    map('q').toApp("1Password").toVar('o_layer', 0),
    map('u').toApp("Proton Pass").toVar('o_layer', 0),
    map('a').toApp("Arc").toVar('o_layer', 0),
    map('s').toApp("Slack").toVar('o_layer', 0),
    map('d').toApp("Figma").toVar('o_layer', 0),
    map('n').toApp("Obsidian").toVar('o_layer', 0),
    map('t').toApp("Kitty").toVar('o_layer', 0),
    map('m').toApp("Multi").toVar('o_layer', 0),
    map('f').toApp("Finder").toVar('o_layer', 0),
    map('p').toApp("Spotify").toVar('o_layer', 0),
    map('w').toApp("Texts").toVar('o_layer', 0),
    map('e').toApp("Zed Preview").toVar('o_layer', 0),
  ]),
  // a = "Arc"
  rule('hyper-a', ifVar('a_layer', 1)).manipulators([
    map('s').to$(open("raycast://extensions/the-browser-company/arc/search-spaces")).toVar('a_layer', 0),
    map('f').to$(open("raycast://extensions/the-browser-company/arc/search")).toVar('a_layer', 0),
    map('t').to$(open("raycast://extensions/the-browser-company/arc/search-tabs")).toVar('a_layer', 0),
  ]),
  // d = "Dev"
  rule('hyper-d', ifVar('d_layer', 1)).manipulators([
    map('s').toApp("Simulator").toVar('d_layer', 0),
    map('f').toApp("Figma").toVar('3_layer', 0),
  ]),
  // w = "Window"
  rule('hyper-w', ifVar('w_layer', 1)).manipulators([
    // Hide window
    map('semicolon').to('h', 'right_command').toVar('w_layer', 0),
    map('y').to$(windowManagement("previous-display")).toVar('w_layer', 0),
    map('o').to$(windowManagement("next-display")).toVar('w_layer', 0),
    map('k').to$(windowManagement("top-half")).toVar('w_layer', 0),
    map('j').to$(windowManagement("bottom-half")).toVar('w_layer', 0),
    map('h').to$(windowManagement("left-half")).toVar('w_layer', 0),
    map('l').to$(windowManagement("right-half")).toVar('w_layer', 0),
    map('f').to$(windowManagement("maximize")).toVar('w_layer', 0),
    map('a').to$(windowManagement("almost-maximize")).toVar('w_layer', 0),
    // Previous tab
    map('u').to('tab', ['right_command', 'right_shift']).toVar('w_layer', 0),
    // Next tab
    map('i').to('tab', 'right_control').toVar('w_layer', 0),
    // Next window
    map('n').to('grave_accent_and_tilde', 'right_command').toVar('w_layer', 0),
    // window back
    map('b').to('open_bracket', 'right_command').toVar('w_layer', 0),
    // Window forward
    map('m').to('close_bracket', 'right_command').toVar('w_layer', 0),
    // Windo next display
    map('d').to('right_arrow', ["right_control", "right_option", "right_command"]).toVar('w_layer', 0),
  ]),
  // s = "System"
  rule('hyper-s', ifVar('s_layer', 1)).manipulators([
    map('u').to('volume_increment').toVar('s_layer', 0),
    map('j').to("volume_decrement").toVar('s_layer', 0),
    map('l').to('q', ["right_control", "right_command"]).toVar('s_layer', 0),
    map('p').to('play_or_pause').toVar('s_layer', 0),
    map('semicolon').to('fastforward').toVar('s_layer', 0),
    map('e').to$(open('raycast://extensions/FezVrasta/emoji/emoji')).toVar('s_layer', 0),
    map('d').to$(open('raycast://extensions/yakitrak/do-not-disturb/toggle')).toVar('s_layer', 0),
  ]),
  // v = "moVe"
  rule('hyper-v', ifVar('v_layer', 1)).manipulators([
    // Magicmove via homerow.app
    map('m').to('f', 'right_control').toVar('v_layer', 0),
    // Scroll mode via homerow.app
    map('j').to('j', 'right_control').toVar('v_layer', 0),
    map('k').to('d', ["right_shift", "right_command"]).toVar('v_layer', 0),
    map('u').to('page_down').toVar('v_layer', 0),
    map('i').to('page_up').toVar('v_layer', 0),
  ]),
  // c = "Music"
  rule('hyper-c', ifVar('c_layer', 1)).manipulators([
    map('e').to('play_or_pause').toVar('c_layer', 0),
    map('l').to('fastforward').toVar('c_layer', 0),
    map('h').to('rewind').toVar('c_layer', 0),
  ]),
  // r = "Raycast"
  rule('hyper-r', ifVar('r_layer', 1)).manipulators([
    map('n').to$(open("raycast://script-commands/notifications")).toVar('r_layer', 0),
    map('e').to$(open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols")).toVar('r_layer', 0),
    map('c').to$(open("raycast://extensions/raycast/system/open-camera")).toVar('r_layer', 0),
    map('p').to$(open("raycast://extensions/raycast/raycast/confetti")).toVar('r_layer', 0),
    map('a').to$(open("raycast://extensions/raycast/raycast-ai/ai-chat")).toVar('r_layer', 0),
    map('s').to$(open("raycast://extensions/raycast/silent-mention/index")).toVar('r_layer', 0),
    map('h').to$(open("raycast://extensions/raycast/clipboard-history/clipboard-history")).toVar('r_layer', 0),
    map('y').to$(open("raycast://extensions/koinzhang/copy-path/copy-path")).toVar('r_layer', 0),
  ]),
])
