/// Configuration for the build system
pub struct DistConfig {
    pub target: Target,
    pub profile: Profile,
    pub dist_dir: String,
}

/// Choose some sane defaults
impl Default for DistConfig {
    fn default() -> Self {
        Self {
            target: Target::Wasi,
            profile: Profile::Release,
            dist_dir: "dist".to_string(),
        }
    }
}

impl DistConfig {
    pub fn new(target: Target, profile: Profile, dist_dir: String) -> Self {
        Self {
            target,
            profile,
            dist_dir,
        }
    }
}

/// The manifest profile with which to build
pub enum Profile {
    Release,
    Debug,
}

impl Profile {
    pub fn as_str(&self) -> &str {
        match self {
            Profile::Release => "release",
            Profile::Debug => "debug",
        }
    }
}

impl std::ops::Deref for Profile {
    type Target = str;

    fn deref(&self) -> &Self::Target {
        match self {
            Profile::Release => "release",
            Profile::Debug => "debug",
        }
    }
}

impl From<Profile> for String {
    fn from(profile: Profile) -> Self {
        match profile {
            Profile::Release => "release".to_string(),
            Profile::Debug => "debug".to_string(),
        }
    }
}

impl From<Profile> for &'static str {
    fn from(profile: Profile) -> Self {
        match profile {
            Profile::Release => "release",
            Profile::Debug => "debug",
        }
    }
}

pub enum Target {
    Wasi,
    Unknown,
}

impl Target {
    pub fn as_str(&self) -> &str {
        match self {
            Target::Wasi => "wasm32-wasi",
            Target::Unknown => "wasm32-unknown-unknown",
        }
    }
}

// impl deref for targets to get deref coercion
// Set Wasi to "wasm32-wasi"
impl std::ops::Deref for Target {
    type Target = str;

    fn deref(&self) -> &Self::Target {
        match self {
            Target::Wasi => "wasm32-wasi",
            Target::Unknown => "wasm32-unknown-unknown",
        }
    }
}

impl From<Target> for String {
    fn from(target: Target) -> Self {
        match target {
            Target::Wasi => "wasm32-wasi".to_string(),
            Target::Unknown => "wasm32-unknown-unknown".to_string(),
        }
    }
}

impl From<Target> for &'static str {
    fn from(target: Target) -> Self {
        match target {
            Target::Wasi => "wasm32-wasi",
            Target::Unknown => "wasm32-unknown-unknown",
        }
    }
}
