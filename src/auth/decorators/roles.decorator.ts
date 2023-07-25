
import { SetMetadata } from '@nestjs/common';

export const metaDataKey = 'roles';
export const RolesMeta = (roles: string[]) => SetMetadata(metaDataKey, [...roles]);
